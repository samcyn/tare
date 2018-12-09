/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React from 'react';
import Card from '../../Global/Card/Card';
import PropTypes from 'prop-types'; 

import './AdminDashboard.css';

const AdminStats = ({ color, icon, title, subtitle }) => {
  return (
    <div className="stats is-flex align-items-center">
      <div className={`stats__balls 
        is-flex 
        align-items-center 
        justify-content-center ` + (color ? '' : "has-background-primary")}
        style={ { backgroundColor: color }}>
        { icon }
      </div>
      <div className="stats__info">
        <h5 className="has-text-weight-bold is-size-4-mobile">{ title }</h5>
        <p className="has-text-grey-dark is-size-7-mobile">{ subtitle }</p>
      </div>
    </div>
  );
}

AdminStats.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

const AdminDashboard = () => (
  <section>
    {/* S T A T S */}
    <div className="dashboard__stats">
      <div className="columns is-mobile is-multiline is-half-gap">
        <div className="column is-6-mobile">
          <Card>
            <AdminStats 
              color="crimson" 
              title="$425" 
              subtitle="a new way" 
              icon={ <i className="fa fa-users">2</i>}/>
          </Card>
        </div>
        <div className="column is-6-mobile">
          <Card>
            <AdminStats
              color="#00522D"
              title="$425"
              subtitle="a new way"
              icon={<i className="fa fa-users">2</i>} />
          </Card>
        </div>
        <div className="column is-6-mobile">
          <Card>
            <AdminStats
              color="green"
              title="$425"
              subtitle="a new way"
              icon={<i className="fa fa-users">2</i>} />
          </Card>
        </div>
        <div className="column is-6-mobile">
          <Card>
            <AdminStats
              color="aliceblue"
              title="$425"
              subtitle="a new way"
              icon={<i className="fa fa-users">2</i>} />
          </Card>
        </div>
      </div>
    </div>
    {/* C H A R T S */}
    <div className="dashboard__charts">
      <div className="columns is-desktop is-multiline is-half-gap">
        <div className="column is-8-desktop">
          <Card 
            fullheight 
            header 
            headerTitle="Weekly Sales">K</Card>
        </div>
        <div className="column">
          <div className="columns is-desktop is-multiline is-half-gap-bottom">
            <div className="column is-12">
              <Card>Y</Card>
            </div>
            <div className="column is-12">
              <Card>U</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* C H A R T S */}
    <div className="dashboard__charts">
      <div className="columns is-desktop is-multiline is-half-gap">
        <div className="column is-5-desktop">
          <Card 
            fullheight
            header
            headerTitle="Barchart">L</Card>
        </div>
        <div className="column is-7-desktop">
          <Card
            fullheight
            header
            headerTitle="Barchart">L</Card>
        </div>
      </div>
    </div>
  </section>
);

export default AdminDashboard;