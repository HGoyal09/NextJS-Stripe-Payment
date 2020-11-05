import React, {Component} from "react";
import axios from "axios";
import {Control, LocalForm} from "react-redux-form";
import {Button, Col, Row} from "reactstrap";



const UpdateForm = ({selectedCard}) => {

  const handleSubmit = async values => {
    await axios.post("/api/updateCard", {expiryMonth: values.expiryMonth, selectedCard});
  };


  const expiryMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
    return (
        <option>{month}</option>
    )
  });


  return (
      <LocalForm onSubmit={(values) => handleSubmit(values)}>
        <Row className="form-group">
          <Col md={10}>
            <Control.select model=".expiryMonth" className="form-control" type="select" name="expiryMonth">
              {expiryMonth}
            </Control.select>
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={{size: 10, offset: 2}}>
            <Button type="submit" color="primary">
              Save Changes
            </Button>
          </Col>
        </Row>
      </LocalForm>
  )
};



class UpdateCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <UpdateForm selectedCard={this.props.selectedCard}/>
        </div>
    )
  }
}

export default UpdateCard;