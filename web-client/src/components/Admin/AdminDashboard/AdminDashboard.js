/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';

import AdminDashboardStats from './AdminDashboardUtility/AdminDashboardStats';
import AdminDashboardAreaChart from './AdminDashboardUtility/AdminDashBoardAreaChart';
import AdminDashboardBarChart from './AdminDashboardUtility/AdminDashboardBarChart';
import AdminDashboardPieChart from './AdminDashboardUtility/AdminDashboardPieChart';
import Card from '../../Global/Card/Card';

import './AdminDashboard.css';

class AdminDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [
        { name: 'A', uv: 4000, pv: 2400, amt: 2500 }, 
        { name: 'B', uv: 3000, pv: 1398, amt: 2800 }, 
        { name: 'C', uv: 2000, pv: 9800, amt: 2800 }, 
        { name: 'D', uv: 2780, pv: 3908, amt: 3200 }, 
        { name: 'E', uv: 1890, pv: 4800, amt: 3200 },
        { name: 'F', uv: 2390, pv: 3800, amt: 3200 }, 
        { name: 'G', uv: 3490, pv: 4300, amt: 3200 }, 
      ],
      pieChartData: [
        {
          name: 'Group A',
          value: 400
        },
        {
          name: 'Group B',
          value: 300
        },
        {
          name: 'Group C',
          value: 300
        },
        {
          name: 'Group D',
          value: 200
        },
      ],
    }
  }

  render () {
    return (
      <section>
        {/* S T A T S */}
        <div className="dashboard__stats">
          <div className="columns is-mobile is-multiline is-half-gap">
            <div className="column is-6-mobile">
              <Card>
                <AdminDashboardStats
                  color="orange"
                  title="$425"
                  subtitle="a new way"
                  icon="user" />
              </Card>
            </div>
            <div className="column is-6-mobile">
              <Card>
                <AdminDashboardStats
                  color="#00522D"
                  title="$425"
                  subtitle="a new way"
                  icon="pie-chart" />
              </Card>
            </div>
            <div className="column is-6-mobile">
              <Card>
                <AdminDashboardStats
                  color="brown"
                  title="$425"
                  subtitle="a new way"
                  icon="tag" />
              </Card>
            </div>
            <div className="column is-6-mobile">
              <Card>
                <AdminDashboardStats
                  color="green"
                  title="$425"
                  subtitle="a new way"
                  icon="trophy" />
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
                headerTitle="Weekly Sales">
                <AdminDashboardAreaChart data={ this.state.data } />
              </Card>
            </div>
            <div className="column is-4-desktop">
              <div className="columns is-desktop is-multiline is-half-gap-bottom">
                <div className="column is-12">
                  <Card>
                    <AdminDashboardStats title="RIGHT" subtitle="testing" icon="user"/>
                  </Card>
                </div>
                <div className="column is-12">
                  <Card>
                    <AdminDashboardStats title="LEFT" subtitle="testing" icon="user"/>
                  </Card>
                </div>
                <div className="column is-12">
                  <Card>
                    <AdminDashboardStats title="LEFT" subtitle="testing" icon="user"/>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* C H A R T S */}
        <div className="dashboard__charts">
          <div className="columns is-desktop is-multiline is-half-gap">
            <div className="column is-7-desktop">
              <Card
                fullheight
                header
                headerTitle="Barchart">
                <AdminDashboardBarChart data={ this.state.data }/>
              </Card>
            </div>
            <div className="column is-5-desktop">
              <Card
                fullheight
                header
                headerTitle="PieChart">
                  <AdminDashboardPieChart data={this.state.pieChartData} />
                </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AdminDashboard;