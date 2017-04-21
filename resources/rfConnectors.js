const jsonApi = require('jsonapi-server')

const rfConnectorHandler = require('../handlers/rfConnectorHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'rfConnectors',
  description: 'Used to represent all the rf connection ports in the system.',
  handlers: rfConnectorHandler,
  searchParams: { },
  attributes: {
    outputName: jsonApi.Joi.string()
      .description('Friendly name of the output port on the source side')
      .example('Sat3 Dish Cband Vertical')
      .example('Quintech out 3'),
    outputDevice: jsonApi.Joi.string()
      .description('HasOne for source device')
      .example('Sat3 Dish'),
    outputPort: jsonApi.Joi.number()
      .description('Index of output port on output device')
      .example(1),
    inputName: jsonApi.Joi.string()
      .description('Friendly name of the input port on the source side')
      .example('Quintech in 5')
      .example('REM_62 input 1'),
    inputDevice: jsonApi.Joi.one('receivers')
      .description('HasOne for destination device; receivers, lbandRouters')
      .example('REM_62'),
    inputPort: jsonApi.Joi.number()
      .description('Index of input port on destination device')
      .example(1)
  },
  examples: [
    {
      id: 'aab14854-97e7-401c-98c8-0bd5ec922d23',
      type: 'rfConnectors',
      outputName: 'QT - Out 2',
      outputDevice: 'lbandRouter',
      // outputDevice: { type: 'lbandRouter', id: 'ad3aa89e-9c5b-4ac9-a652-6670f9f27582' },
      outputPort: 4,
      inputName: 'REM_64 - IN 1',
      inputDevice: 'receiver',
      // inputDevice: { type: 'receiver', id: 'ad3aa89e-9c5b-4ac9-a652-6670f9f27583' },
      inputPort: 1
    }
  ]
})
