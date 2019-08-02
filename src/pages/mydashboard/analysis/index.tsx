import { Col, Dropdown, Icon, Menu, Row , Card} from 'antd';
import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { sysanalysisData } from './data';
import styles from './style.less';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SystemRow = React.lazy(() => import('./components/SystemRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));
import { Pie, WaterWave, Gauge, TagCloud } from './components/Charts';
import ActiveChart from './components/ActiveChart';

interface dashboardAnalysisProps {
  dashboardAnalysis: sysanalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface dashboardAnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

@connect(
  ({
    dashboardAnalysis,
    loading,
  }: {
    dashboardAnalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardAnalysis,
    loading: loading.effects['dashboardAnalysis/fetch'],
  }),
)
class Analysis extends Component<
  dashboardAnalysisProps,
  dashboardAnalysisState
> {
  state: dashboardAnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    /*
    this.reqRef = requestAnimationFrame(() => {

      
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
  

    });
 */
      
       setInterval(() => {
   this.props.dispatch({type: 'dashboardAnalysis/fetch'});
   }, 5000);
  
  }

   

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { dashboardAnalysis, loading } = this.props;
    const {
      systemData,
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = dashboardAnalysis;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <SystemRow loading={loading} systemData={systemData} />
          </Suspense>
        
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
           
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
            </Col>
         
               <Col xl={6} lg={24} md={24} sm={24} xs={24}>
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
                <Col xl={6} lg={24} md={24} sm={24} xs={24}     style={{ marginBottom: 24 }}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading}
                  visitData2={visitData2}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
              
                />
              </Suspense>
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
          <Suspense fallback={null}>
            <OfflineData
              activeKey={activeKey}
              loading={loading}
              offlineData={offlineData}
              offlineChartData={offlineChartData}
              handleTabChange={this.handleTabChange}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
