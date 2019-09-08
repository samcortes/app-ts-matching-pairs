import * as React from 'react';

interface Props {
    timer: number;
}

export const Timer: React.FunctionComponent<Props> = (Props) => {

    var displayTime = new Date(0);
    displayTime.setSeconds(Props.timer);
    var timeString = displayTime.toISOString().substr(11, 8);

    return (
        <div className="Timer">
            {timeString}
        </div>
    )
};