import React, {Component} from "react";
import {Control, LocalForm} from "react-redux-form";
import { Button, Row, Col } from "reactstrap";
import HandleSelectedCard from "./HandleCardComponent";

class RenderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null
    };

    this.cardDetails = this.cardDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {

    this.setState({
      selectedCard: this.props.creditCards.data.filter((creditCard) => {
        return (creditCard.card.last4 === values.cardNumber)
      })[0]
    });
  }

  cardDetails() {
    if (this.props.creditCards) {
      const cards = this.props.creditCards.data.map((creditCard) => {
        return (
            <option>{creditCard.card.last4}</option>
        )
      });

      return (
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Col md={10}>
                <Control.select model=".cardNumber" className="form-control" type="select" name="cardNumber">
                  {cards}
                </Control.select>
              </Col>
            </Row>

            <Row className="form-group">
              <Col md={{size: 10, offset: 2}}>
                <Button type="submit" color="primary">
                  Use Card
                </Button>
              </Col>
            </Row>
          </LocalForm>
      )
    } else {
      return <h2>No card found</h2>
    }
  }

  render() {
    return (
        <div>
          {this.cardDetails()}
          <HandleSelectedCard selectedCard={this.state.selectedCard}/>
        </div>
    )
  }
}


export default RenderCard;