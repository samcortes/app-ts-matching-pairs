import * as React from 'react';
import { Card } from '../models/card';
import { CardListItem } from './CardListItem';

import '../styles/cards.scss';

interface Props {
    cards: Card[];
    onTry: (card: Card) => void;
}

export const CardList: React.FunctionComponent<Props> = ({cards, onTry}) => (
    <ul className="Cards-container">
        {cards.map(card=> (
            <CardListItem card={card} onTry={onTry}/>
        ))}
    </ul>
);
