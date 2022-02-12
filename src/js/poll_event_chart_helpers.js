const moment = require("moment");

function sortedIndex(array, value) {
    let low = 0;
    let high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((o, i) => o[i] || '', obj)
}

function drawText(ctx, text, text_x, text_y, text_height, color, centering = false, right = false) {
    let text_measurement = ctx.measureText(text)
    let width = Math.round(text_measurement.width)

    if (centering) {
        ctx.textAlign = "center";
    } else if (right) {
        ctx.textAlign = "right";
    } else {
        ctx.textAlign = "left";
    }

    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    if (centering) {
        ctx.fillRect(text_x - width / 2, text_y, width, text_height);
    } else if (right) {
        ctx.fillRect(text_x - width, text_y, width, text_height);
    } else {
        ctx.fillRect(text_x, text_y, width, text_height);
    }
    ctx.fillStyle = color;
    ctx.fillText(text, text_x, text_y + text_height / 2);
}

function drawVerticalLine(ctx, x, topY, bottomY) {
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.lineDashOffset = 100;
    ctx.stroke();
}

function drawPoint(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.moveTo(x, y);
    ctx.ellipse(x, y, size / 2, size / 2, 0, 0, 2 * Math.PI, true)
    ctx.stroke();
}

function drawHoverLabels(chart) {
    if (!chart._mousemove_active) {
        return;
    }

    let line_datasets = chart.data.datasets.filter((dataset) => dataset.type === "line");

    if(!chart._x_dates) {
        chart._x_dates = line_datasets[0].data.map(function (element) {
            return element.x;
        })
    }

    let ctx = chart.ctx;
    let x = chart._mousemove_x;
    let xDate = chart._mousemove_date;
    let topY = chart.scales.y.top;
    let bottomY = chart.scales.y.bottom;

    ctx.save();

    let i = sortedIndex(chart._x_dates, xDate) - 1;
    let showElectionResult = i+1 === chart._x_dates.length;
    if(showElectionResult) {
        x = chart.scales.x.getPixelForValue(chart._electionDate);
        xDate = chart._electionDate;

        line_datasets.forEach(function (dataset) {
            dataset._intersect_value = dataset.electionResult;
            dataset._intersect_y = Math.round(chart.scales.y.getPixelForValue(dataset._intersect_value));
        });
    } else {
        drawVerticalLine(ctx, x, topY, bottomY)

        let prev_el = line_datasets[0].data[i];
        let next_el = line_datasets[0].data[i + 1];
        if (prev_el.x <= xDate && next_el.x >= xDate) {
            // Prepare the interpolation
            let diff1 = (xDate - prev_el.x);
            let diff2 = (next_el.x - xDate);
            let diff = (next_el.x - prev_el.x);

            line_datasets.forEach(function (dataset) {
                let yAxisKey = dataset.parsing.yAxisKey;
                // Interpolate
                let value = (getNestedValue(prev_el, yAxisKey) * diff2 + getNestedValue(next_el, yAxisKey) * diff1) / diff;
                dataset._intersect_y = Math.round(chart.scales.y.getPixelForValue(value));
                dataset._intersect_value = value;
            });
        }
    }


    // We sort the datasets from bottom to top so that the render ordering is correct
    line_datasets.sort(function (a, b) {
        if (a._intersect_value > b._intersect_value) return 1;
        if (a._intersect_value < b._intersect_value) return -1;
        return 0;
    });

    let percentage = (xDate.getTime() - chart.options.scales.x.min.getTime())
        / (chart.options.scales.x.max.getTime() - chart.options.scales.x.min.getTime());

    let text_blocked = [];
    line_datasets.forEach(function (dataset) {
        let is_right = percentage <= 0.5;

        let text_percent = Math.round(dataset._intersect_value * 10) / 10 + "%";
        let text = is_right ? text_percent + " " + dataset.labelHover : dataset.labelHover + " " + text_percent;

        let text_x = is_right ? x + 10 : x - 10;
        let text_height = 12;

        let rect_start = dataset._intersect_y - text_height / 2
        let blocking_element = text_blocked.reverse().find(function (element) {
            return rect_start > element[0] || rect_start + text_height > element[0];
        });

        if (blocking_element) {
            rect_start = blocking_element[0] - text_height
        }

        text_blocked.push([rect_start, rect_start + text_height])

        drawPoint(ctx, x, dataset._intersect_y, dataset.labelHoverPointSize, dataset.labelHoverPointColor)
        drawText(ctx, text, text_x, rect_start, text_height, dataset.labelHoverPointColor, false, !is_right);
    });

    if(showElectionResult) {
        drawText(ctx,
            "Wahlergebnis",
            x, bottomY - 8,
            15,
            "#000000", false, true);
    } else {
        drawText(ctx,
            moment(xDate).format('DD.MM.YYYY'),
            x, bottomY - 8,
            15,
            "#000000", percentage < 0.9 && percentage > 0.1, percentage >= 0.9);
    }

    ctx.restore();
}

export {drawHoverLabels};