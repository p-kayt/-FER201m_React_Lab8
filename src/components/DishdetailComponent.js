import React,{ Component }  from "react";

import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
   if (dish != null) {
      return (
         <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
               <CardImg width="100%" src={dish.image} alt={dish.name} />
               <CardBody>
                  <CardTitle tag={"h5"}>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
               </CardBody>
            </Card>
         </div>
      );
   } else {
      return <div></div>;
   }
}

function RenderComments({ comments, dishId }) {
   if (comments != null) {
      const showComments = comments.map((cmt) => {
         const options = { month: "short", year: "numeric", day: "numeric" };
         return (
            <span key={cmt.id}>
               <p>{cmt.comment}</p>
               <p>
                  --{cmt.author}, {new Date(cmt.date).toLocaleDateString("en-US", options)}
               </p>
            </span>
         );
      });

      return (
         <div className="col-12 col-md-5 m-1">
            <h3>Comments</h3>
            {showComments}
            <CommentForm dishId={dishId}/>
         </div>
      );
   } else {
      return <div></div>;
   }
}

const DishDetail = (props) => {
   const dish = props.dish;
   if (dish == null) {
      return <div></div>;
   } else {
      return (
         <div className="container">
            <div className="row">
               <Breadcrumb>
                  <BreadcrumbItem>
                     <Link to="/home">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                     <Link to="/menu">Menu</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
               </Breadcrumb>
               <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
               </div>
            </div>
            <div className="row">
               <RenderDish dish={props.dish} />
               <RenderComments comments={props.comments} dishId={props.dish.id}/>
               
            </div>
         </div>
      );
   }
};

export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export class CommentForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false,
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   toggleModal() {
      this.setState({ isModalOpen: !this.state.isModalOpen });
   }

   handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
   }

   render() {
      return (
         <div>
            <Button outline onClick={this.toggleModal}>
               <span className="fa fa-pencil fa-lg">Submit comment</span>
            </Button>

            <div className="row row-content">
               <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                     Submit comment
                     
                  </ModalHeader>
                  <ModalBody>
                     <div className="col">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                           <Row className="form-group col-12">
                              <Label htmlFor="rating" className="col-12">Rating</Label>
                              <Col className="col-12">
                                 <Control.select model=".rating" name="rating" className="form-control col-12">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                 </Control.select>
                              </Col>
                           </Row>

                           <Row className="form-group col-12">
                              <Label htmlFor="author" className="col-12">
                                 Your name
                              </Label>
                              <Col className="col-12">
                                 <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{ minLength: minLength(2), maxLength: maxLength(15) }}
                                 />
                                 <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                       minLength: "Must be greater than 2 characters",
                                       maxLength: "Must be 15 charaters or less",
                                    }}
                                 />
                              </Col>
                           </Row>

                           <Row className="form-group col-12">
                              <Label htmlFor="feedback" md={3}>
                                 Comment
                              </Label>
                              <Col className="col-12">
                                 <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                 <Errors className="text-danger" model=".comment" show="touched" messages={{ required: "Required" }} />
                              </Col>
                           </Row>

                           <Button type="submit" value="submit" color="primary">
                              Submit
                           </Button>
                        </LocalForm>
                     </div>
                  </ModalBody>
               </Modal>
            </div>
         </div>
      );
   }
}
