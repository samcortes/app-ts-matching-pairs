import React, { FunctionComponent } from 'react';

import { Card } from '../models/card';
import 'font-awesome/css/font-awesome.min.css';

interface Props {
    card: Card;
    onTry: (card: Card) => void;
}

export const CardListItem: FunctionComponent<Props> = ({ card, onTry }) => {
    const onClick = () => {
        onTry(card);
    };

    let cardStyle = '';
    let icon = "fa fa-question";

    if (card.try) {
        icon = "fa fa-" + card.label;
        cardStyle = "Card-try";
    }

    if (card.solved) {
        icon = "fa fa-" + card.label;
        cardStyle = 'Card-solved';
    }

    return(
        
        <li onClick={onClick} className={cardStyle}>
            <div className="Card-box">
                <i className={icon} aria-hidden="true"></i>
            </div>
        </li>
    )
}