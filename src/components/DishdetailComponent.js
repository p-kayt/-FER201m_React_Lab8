import React, { Component } from "react";
import { 
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle 
}from "reactstrap";
import { DISHES } from "../shared/dishes";

class DishDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dishes: DISHES,
      };
   }

   renderDish(dish) {
      if (dish != null) {
         return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
               <Card>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardBody>
                     <CardTitle tag={"h4"}>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                  </CardBody>
               </Card>
            </div>
         );
      } else {
         return <div></div>;
      }
   }

   renderComments(comments) {
      if (comments != null) {
         const showComments = comments.map((cmt) => {
            const options = {  month: 'short', year: 'numeric', day: 'numeric' }
            return (
               <span key={cmt.id}>
                  <p>{cmt.comment}</p>
                  <p>
                     --{cmt.author}, {new Date(cmt.date).toLocaleDateString('en-US',options)}
                  </p>
               </span>
            );
         });

         return (
            <div className="col-12 col-md-5 m-1">
               <h3>Comments</h3>
               {showComments}
            </div>
         );
      } else {
         return <div></div>;
      }
   }

   render() {
      const dish = this.props.dish;
      if (dish == null) {
         return <div></div>;
      } else {
         const dishItem = this.renderDish(dish);
         const dishComment = this.renderComments(dish.comments);
         return (
            <div className="row">
               {dishItem}
               {dishComment}
            </div>
         );
      }
   }
}

export default DishDetail;
