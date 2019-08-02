import { Card, Steps } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const { Step } = Steps;

interface StepFormProps {
  current: StateType['current'];
}

@connect(({ formStepForm }: { formStepForm: StateType }) => ({
  current: formStepForm.current,
}))
class StepForm extends Component<StepFormProps> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <PageHeaderWrapper content={<FormattedMessage id="form-step-form.basic.title" />}>
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="정보입력" />
              <Step title="암호 입력" />
              <Step title="완료" />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default StepForm;
