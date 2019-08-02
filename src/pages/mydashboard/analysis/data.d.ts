export interface VisitDataType {
  x: string;
  y: number;
}

export interface SearchDataType {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface systemType {
    hostid: string;
    uptime: string;
    ip: string;
}

export interface networkType {
    read: number
    write: number;
    thruput: number;
}
export interface SystemDataType {
  system : systemType;
 cpu :   number;
  
 memory:   number;
  
 network: networkType;
 filesystem:   number;

}
export interface OfflineDataType {
  name: string;
  cvr: number;
}

export interface OfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface RadarData {
  name: string;
  label: string;
  value: number;
}

export interface sysanalysisData {
  systemData: Partial<SystemDataType>,
  visitData: VisitDataType[];
  visitData2: VisitDataType[];
  salesData: VisitDataType[];
  searchData: SearchDataType[];
  offlineData: OfflineDataType[];
  offlineChartData: OfflineChartData[];
  salesTypeData: VisitDataType[];
  salesTypeDataOnline: VisitDataType[];
  salesTypeDataOffline: VisitDataType[];
  radarData: RadarData[];
}
