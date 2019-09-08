import * as React from 'react';
import 'font-awesome/css/font-awesome.min.css';

interface Props {
    onTryAgain: () => void;
    hasWon: boolean;
    recordTime: number;
}

export const TryAgain: React.FunctionComponent<Props> = (Props) => {
    const onClick = () => {
        Props.onTryAgain();
    }

    return (
        <div className="Retry-wrapper">
            <div className="Retry-win-wrapper">
                <h3>Congratulations!</h3>
                <h1>You Win</h1>
                <h4>Thanks for playing!</h4>
                <button onClick={onClick}>Try again?</button>
            </div>
        </div>
    )
}