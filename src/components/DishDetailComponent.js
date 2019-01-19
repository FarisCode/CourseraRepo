import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";


function RenderComments ({comments})  {
    const commentsList = comments.map((comment) =>
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

function RenderDish ({dish}){
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

const dishDetail= props => {
  const { dish } = props;
    const card = dish ? (
      <div className='container'>
        <div className='row'>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish}/>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={dish.comments}/>
          </div>
        </div>
      </div>
    )
      : <div></div>;
  return card;
}

export default dishDetail;