import mockjs from 'mockjs';

/*
export default {
  'GET  /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
};
*/
export default {
  'GET  /api/tags': (req, res) => {
  res.send(mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }))
  }
};