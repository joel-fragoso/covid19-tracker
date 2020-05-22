import React, { Component } from 'react';
import { Card as MuiCard, CardContent, Typography } from '@material-ui/core';

// import './Card.css';

class Card extends Component {
  render() {
    return(
      <MuiCard>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Infected</Typography>
        </CardContent>
      </MuiCard>
    );
  }
}

export default Card;
