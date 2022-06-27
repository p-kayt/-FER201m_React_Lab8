import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

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

function RenderComments({ comments }) {
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
               <RenderComments comments={props.comments} />
            </div>
         </div>
      );
   }
};

export default DishDetail;
