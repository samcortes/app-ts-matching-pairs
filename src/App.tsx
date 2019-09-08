import React, { Component } from 'react';

import { CardList } from './components/CardsList';
import { Card } from './models/card';
import { TryAgain } from './components/TryAgain';

import './styles/app.scss';
import Logo from './assets/images/samanthaio.svg';

interface State {
  cards: Card[];
  won: boolean;
  timer: number;
  totalTimer: number;
}

export default class App extends Component<{}, State> {

  static readonly DEFAULT_CARDS: Card[] = [
    { id: 1, label: 'amazon', solved: false },
    { id: 2, label: 'firefox', solved: false},
    { id: 3, label: 'instagram', solved: false},
    { id: 4, label: 'youtube', solved: false},
    { id: 5, label: 'apple', solved: false},
    { id: 6, label: 'android', solved: false},
  ];

  private timerInterval: any = 0;

  state = {
    cards: App.DEFAULT_CARDS,
    won: false,
    timer: 0,
    totalTimer: 0,
  };

  componentWillMount() {
    this.setState({
      cards: this.prepareCards(this.state.cards)
    })
  }

  render() {
    let style = 'App-container'
    if (this.state.won) {
      style = 'App-container App-won';
    }
    return(
      <div className={style}>

        <div className="App-header">
            <a href="https://www.samanthaio.com" className="App-header-logo">
                <img src={Logo} />
            </a>
            <p className="mb-0 mt-0">
              <span className="thin">Matching</span>
              <span className="thick">Pairs</span>
            </p>
        </div>

        <div className="Apps-wrapper">
          <TryAgain onTryAgain={this.tryAgain} hasWon={this.state.won} recordTime={this.state.totalTimer} />
          <CardList cards={this.state.cards} onTry={this.tryCard} />
        </div>
        <p className="App-copyright">Copyright © 2019 samanthaio. All rights reserved.</p>
      </div>
    )
  }

  private prepareCards = (cards: Card[]) => {
    let duplicated = cards
                      .map(card => (
                        [
                          { id: card.id + 100, label: card.label, solved: false}, 
                          { id: card.id + 200, label: card.label, solved: false},
                        ]
                      ))
                      .reduce((a, b) =>
                        a.concat(b)
                      );

    for (let i = duplicated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
    }

    return duplicated;
  };

  private tryAgain = () => {
    clearInterval(this.timerInterval);
    this.timerInterval = 0;
    
    this.setState({
      cards: this.prepareCards(App.DEFAULT_CARDS),
      won: false,
      timer: 0,
    });
  };

  private tryCard = (cardToTry: Card) => {
    if (cardToTry.try || cardToTry.solved) {
      return;
    }
    this.setState(previousState => {
      let pair = previousState.cards.find(card => (
        card.label == cardToTry.label && card.try === true
      ));
      let reset = previousState.cards.filter(card => (
        card.try === true
      )).length;

      return {
        cards: previousState.cards.map(card => {
          if (card.solved) {
            return card;
          }
          if (pair && card.label == cardToTry.label && reset < 2) {
            card.solved = true;
            card.try = false;
          } else if (card.id == cardToTry.id) {
            card.try = true;
          }

          if (reset >= 2 && card.id != cardToTry.id) {
            card.solved = false;
            card.try = false;
          }

          return card;
        }),
        won: this.didWin(),

      }
    });
  };

  private didWin = () => {
    if (this.state.cards.filter(card => card.solved === true).length === this.state.cards.length) {
      return true;
    }
    return false;
  };

}