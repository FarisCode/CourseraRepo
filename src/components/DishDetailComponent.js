import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Label,
  Modal, ModalBody, ModalHeader, Button, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from "react-redux-form";

class CommentForm extends React.Component {
  state = {
    isModalOpen: false,
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }))
  }
  handleSubmit = (values) => {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  render() {
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && (val.length >= len);

    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Col className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating"
                  className="form-control" defaultValue='1'
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </Col>
              <Col className="form-group">
                <Label htmlFor="author">Author</Label>
                <Control.text model=".author" id="author" name="author"
                  className="form-control"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />
              </Col>
              <Col className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" rows={6} id="comment" name="comment"
                  className="form-control"
                />
              </Col>
              <Col className="form-group" >
                <Button color="primary" >
                  Submit
                </Button>
              </Col>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline color="secondary" onClick={this.toggleModal}>Submit Comment</Button>
      </>
    )
  }
}

function RenderComments({ comments, addComment, dishId }) {
  const commentsList = comments.map((comment) =>
    <div key={comment.id}>
      <p>{comment.comment}</p>
      <p>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}`}</p>
    </div>
  );
  return (
    <>
      <h4>Comments</h4>
      {commentsList}
      <CommentForm dishId={dishId} addComment={addComment} />
    </>
  )
}

function RenderDish({ dish }) {
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

const dishDetail = props => {
  const { dish } = props;
  const card = dish ? (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    </div>
  )
    : <div></div>;
  return card;
}

export default dishDetail;