import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

export default class dishDetailComponent extends Component {

  renderComments = (renderComments) => {
    const commentsList = renderComments.map((comment) =>
      <div key={comment.id}>
        <p>{comment.comment}</p>
        <p>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</p>
      </div>
    );
    return (
      <>
        <h4>Comments</h4>
        {commentsList}
      </>
    )
  }

  renderDish = (dish) => {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    const { dish } = this.props;
    const card = dish ? (
      <div className='container'>
        <div className='row'>
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(dish.comments)}
          </div>
        </div>
      </div>
    )
      : <div></div>;

    return card;
  }
}
