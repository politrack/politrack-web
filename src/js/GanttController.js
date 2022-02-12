import {LineController} from 'chart.js';

const TEXT_PADDING = 20;
function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

function calculateXRangeForEvent(chart, event, chartXRangeSteps) {
    const ctx = chart.ctx;
    let x1 = chart.scales.x.getPixelForValue(event.start);
    let x2 = chart.scales.x.getPixelForValue(event.end);
    let width = ctx.measureText(event.name).width;

    if (Math.abs(x2 - x1) > width) {
        return {id: "center", min: x1, max: x2}
    }

    let possible_locations = [
        {
            id: "center",
            min: (x1 + x2) / 2 - width / 2 - TEXT_PADDING,
            max: (x1 + x2) / 2 + width / 2 + TEXT_PADDING,
            count: 0.1 // Count how many scales can live with this, favor center if equal
        },
        {
            id: "left",
            min: x1,
            max: x1 + width + TEXT_PADDING,
            count: 0 // Count how many scales can live with this
        },
        {
            id: "right",
            min: x2 - width - TEXT_PADDING,
            max: x2,
            count: 0 // Count how many scales can live with this
        }
    ];

    chartXRangeSteps.forEach(function (xRangeStep) {
        let rangeMin = chart.scales.x.getPixelForValue(xRangeStep.start_date);
        let rangeMax = chart.scales.x.getPixelForValue(xRangeStep.end_date);

        possible_locations.forEach(function (loc) {
            if(rangeMin <= loc.min && loc.min <= rangeMax) {
                if(loc.max < rangeMax) loc.count++;
            } else {
                loc.count++;
            }
        });
    });

    return possible_locations.reduce(function(prev, current) {
        return (prev.count > current.count) ? prev : current
    });
}

class GanttController extends LineController {
    draw() {
        let x1 = this.chart.scales.x.getPixelForValue(this.getDataset().data[0].x);
        let x2 = this.chart.scales.x.getPixelForValue(this.getDataset().data[1].x);
        let y = this.chart.scales.y2.getPixelForValue(this.getDataset().data[1].y);

        const ctx = this.chart.ctx;

        if (this.getDataset().isVisible) {
            if (x1 < this.chart.scales.x.left || x1 >= this.chart.scales.x.right) return;

            if (this.chart._currently_animating && this.chart._currently_animating_initial)
            {
                if(!this.getDataset().isActiveFunction(this.getDataset().eventId)) super.draw();
            } else {
                super.draw();
            }

            if (this.chart._currently_animating && !this.chart._currently_animating_initial) return;

            let text = this.getDataset().eventName;

            ctx.save();
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            let width = ctx.measureText(text).width;

            if(this.getDataset().eventTextAlignment === "left") {
                ctx.fillText(text, x1 + width/2, y - 2)
            } else if(this.getDataset().eventTextAlignment === "right") {
                ctx.fillText(text, x2 - width / 2, y - 2)
            } else {
                ctx.fillText(text, (x1 + x2) / 2, y - 2)
            }


            if (this.getDataset().isActiveFunction(this.getDataset().eventId)) {
                ctx.beginPath()
                ctx.strokeStyle = this.getDataset().eventColor;
                ctx.lineWidth = 2;
                ctx.moveTo(x1, y);
                if (this.chart._mousemove_active) {
                    ctx.lineTo(this.chart._mousemove_x, y);
                } else {
                    ctx.lineTo(x2, y);
                }

                ctx.stroke();
            }
        } else {
            ctx.save();
        }

        if (this.getDataset().isActiveFunction(this.getDataset().eventId)) {
            let xMax = this.chart._mousemove_active ? this.chart._mousemove_x : x2;
            if (this.getDataset().eventParty === null) {
                ctx.fillStyle = addAlpha("#af9e7f", 0.1);
            } else {
                ctx.fillStyle = addAlpha(this.getDataset().eventColor, 0.1);
            }
            ctx.fillRect(x1, this.chart.scales.y.top,
                xMax - x1, this.chart.scales.y.bottom - this.chart.scales.y.top)
        }

        ctx.restore()

    }
}

GanttController.id = 'gantt';
GanttController.defaults = LineController.defaults;

export {
    GanttController, calculateXRangeForEvent
}

/*

[object Object]
 */