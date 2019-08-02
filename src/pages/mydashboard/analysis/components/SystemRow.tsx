import { Col, Icon, Row, Tooltip, Typography, Spin , Progress} from 'antd';

import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field , Gauge, WaterWave, DashCard} from './Charts';

import Trend from './Trend';
 
import styles from '../style.less';
import { SystemDataType } from '../data';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const SystemRow = ({ loading, systemData }: { loading: boolean; systemData: SystemDataType }) => {
  
  //if ( loading ) { return null}
  if (  systemData == undefined || !Object.keys(systemData).length) { return <Spin/>}
  return (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <DashCard
        bordered={false}
        title={
          <FormattedMessage id="dashboard-analysis.analysis.server" defaultMessage="Server" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboard-analysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <Typography>{systemData.system.hostid}</Typography> }
        footer={
          <Field
            label={
              <FormattedMessage id="dashboard-analysis.analysis.uptime" defaultMessage="uptime" />
            }
            value={systemData.system.uptime}
          />
        }
        contentHeight={100}
      >
      
        <Typography  >
          <FormattedMessage id="dashboard-analysis.analysis.ip" defaultMessage="ip" />
          <span className={styles.trendText}>{systemData.system.ip}</span> 
        </Typography>
      </DashCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="dashboard-analysis.analysis.cpu" defaultMessage="CPU" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboard-analysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={  systemData.cpu+'% used'}
        footer={
          <Field
            label={
              <FormattedMessage id="dashboard-analysis.analysis.cpu" defaultMessage="CPU Idle" />
            }
            value={numeral(systemData.cpu).format('0,0')}
          />
        }
        contentHeight={100}
      >
        <Progress type="dashboard" percent={systemData.cpu} width={80}/>
        
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="dashboard-analysis.analysis.memory" defaultMessage="Memory" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboard-analysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dashboard-analysis.analysis.conversion-rate"
                defaultMessage="Conversion Rate"
              />
            }
            value="60%"
          />
        }
        contentHeight={46}
      >
     <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboard-analysis.analysis.filesystem"
            defaultMessage="FileSystem"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboard-analysis.analysis.introduce"  defaultMessage="Introduce" />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="78%"
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              <FormattedMessage id="dashboard-analysis.analysis.week" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              <FormattedMessage id="dashboard-analysis.analysis.day" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>
  </Row>
  )
};

export default SystemRow;
