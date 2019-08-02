import city from './geographic/city.json';
import province from './geographic/province.json';

function getProvince(req: any, res: { json: (arg0: { name: string; id: string }[]) => void }) {
  return res.json(province);
}

function getCity(
  req: { params: { province: string | number } },
  res: { json: (arg: any) => void },
) {
  return res.json(city[req.params.province]);
}

export default {
  
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
