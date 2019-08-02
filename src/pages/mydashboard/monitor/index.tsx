import { Card, Col, Row, Statistic, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import numeral from 'numeral';
import { StateType } from './model';
import { Pie, WaterWave, Gauge, TagCloud } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import styles from './style.less';

const { Countdown } = Statistic;

const targetTime = new Date().getTime() + 3900000;

interface MonitorProps {
  dashboardMonitor: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

@connect(
  ({
    dashboardMonitor,
    loading,
  }: {
    dashboardMonitor: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    dashboardMonitor,
    loading: loading.models.monitor,
  }),
)
class Monitor extends Component<MonitorProps> {
  componentDidMount() {
    const { dispatch } = this.props;
   dispatch({
      type: 'dashboardMonitor/fetchTags',
    });
 /*
           setInterval(() => {
    dispatch({type: 'dashboardMonitor/fetchTags'});
   }, 5000); 
   */
  }

  render() {
    const { dashboardMonitor, loading } = this.props;
    const { tags } = dashboardMonitor;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.activity-forecast"
                    defaultMessage="Activity forecast"
                  />
                }
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.efficiency"
                    defaultMessage="Efficiency"
                  />
                }
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge
                  title={formatMessage({
                    id: 'dashboard-monitor.monitor.ratio',
                    defaultMessage: 'Ratio',
                  })}
                  height={180}
                  percent={87}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
       
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.resource-surplus"
                    defaultMessage="Resource Surplus"
                  />
                }
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <WaterWave
                  height={161}
                  title={
                    <FormattedMessage
                      id="dashboard-monitor.monitor.fund-surplus"
                      defaultMessage="Fund Surplus"
                    />
                  }
                  percent={34}
                />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Monitor;
