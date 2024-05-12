import React from "react";
import HeaderProd from "components/Headers/HeaderProd";
import { Container, Col, Card } from "reactstrap";
import TableConvension from "../TableEvents/TableConvension";

const Convension = () => {
  return (
    <>
      <HeaderProd title="Convension" description="Une convention dans un laboratoire de recherche informatique est un événement organisé régulièrement ou ponctuellement pour réunir des membres de la communauté scientifique, des praticiens de l'industrie, des étudiants et d'autres parties prenantes afin de discuter de sujets variés liés à l'informatique, tels que les dernières avancées technologiques, les tendances de recherche, les défis et les opportunités du secteur, les bonnes pratiques, les méthodologies, etc."/>
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
            <TableConvension/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Convension;
