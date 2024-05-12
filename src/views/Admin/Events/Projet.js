import React from "react";
import HeaderProd from "components/Headers/HeaderProd";
import { Container, Col, Card } from "reactstrap";
import TableProjet from "../TableEvents/TableProjet";

const Projet = () => {
  return (
    <>
      <HeaderProd title="Projet" description="Un projet dans un laboratoire de recherche informatique est une initiative planifiée et structurée qui vise à répondre à une question de recherche, à résoudre un problème informatique spécifique, à développer une nouvelle technologie ou à explorer de nouvelles idées dans le domaine de l'informatique. Il est généralement mené par une équipe de chercheurs, d'ingénieurs et parfois d'étudiants diplômés, sous la supervision d'un chef de projet ou d'un chercheur principal."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="15">
          <Card className="bg-secondary shadow">
           {/*  <div className="text-center">
              <h3>
                Jessica Jones
                <span className="font-weight-light">, 27</span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Bucharest, Romania
              </div>
              <div className="h5 mt-4">
                <i className="ni business_briefcase-24 mr-2" />
                Solution Manager - Creative Tim Officer
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                <h1>Scientific Article</h1>
              </div>
              <hr className="my-4" />
              <p>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                Murphy — writes, performs and records all of his own music.
              </p>
              <a href="#pablo" onClick={(e) => e.preventDefault()}></a> 
            </div>*/}
            {/* <UserArticleForm /> */}
            <TableProjet/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Projet;
