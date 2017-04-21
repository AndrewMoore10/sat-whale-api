const jsonApi = require('jsonapi-server')
const modulationRegex = /^(dvb-s|dvb-s2|auto)/i;

const receiverHandler = require('../handlers/receiverHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'receivers',
  description: 'Used to represent all the receivers in the system.',
  handlers: receiverHandler,
  searchParams: { },
  attributes: {
    name: jsonApi.Joi.string()
      .description('Friendly receiver name')
      .example('REM 62'),
    ip: jsonApi.Joi.string().ip().required()
      .description('An IP addresss that resolves to the receiver')
      .example('192.168.50.155'),
    driver: jsonApi.Joi.string().required()
      .description('name of the driver that controls this device')
      .example("Ericsson 8200"),
    rfInputs: jsonApi.Joi.many('rfConnectors')
      .description('rf inputs'),
    freq: jsonApi.Joi.number()
      .description('in band frequency')
      .example(4120000),
    loFreq: jsonApi.Joi.number()
      .description('local oscilator offset frequency ')
      .example(5150000),
    symRate: jsonApi.Joi.number()
      .description('Symbol Rate for signal')
      .example(30000000),
    modulation: jsonApi.Joi.string().regex(modulationRegex)
      .default("auto")
      .description('Modulation scheme')
      .example("DVB-S"),
    currentService: jsonApi.Joi.number()
      .default(1)
      .description('ID of service we should be set to; when lock is preset; ird should auto switch to this service if its available')
      .example(104),
    lock: jsonApi.Joi.boolean()
      .default(false)
      .description('lock status of the receiver')
      .example(true)
  },
  examples: [
    {
      id: 'ad3aa89e-9c5b-4ac9-a652-6670f9f27583',
      type: 'receivers',
      name: 'REM_64',
      ip: '192.168.50.159',
      driver: 'Ericsson8200',
      rfInputs: [
        { type: 'rfConnectors', id: 'aab14854-97e7-401c-98c8-0bd5ec922d23' }
      ],
      freq: 12110000,
      loFreq: 11750000,
      symRate: 13333333,
      modulation: "auto",
      currentService: 1,
      lock: true
    }
  ]
})
