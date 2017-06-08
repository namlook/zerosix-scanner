
import { Voucher } from './index'

const data: Voucher[] = [
  {
    code: '123',
    name: "15€ de bon d'achat",
    description: "Sur la dernière collection automne-été 2017",
    value: 15,
    valueUnit: 'euros',
    legalNotices: "Offre non cumulable valable en France métropolitaine",
    imageUrl: "https://adm.zerosix.com/static/placeholders/reward.jpg",
    contact: {
      firstName: 'Nico',
      lastName: 'Job'
    },
    used: false,
    expired: false,
    expirationDate: '04/08/2017'
  },
  {
    code: 'XXX',
    name: "20% de bon d'achat",
    value: 20,
    valueUnit: 'percent',
    description: "Sur la dernière collection automne-été 2017",
    legalNotices: "Offre non cumulable valable en France métropolitaine",
    imageUrl: "https://adm.zerosix.com/static/placeholders/reward.jpg",
    contact: {
      firstName: 'Nico',
      lastName: 'Marley'
    },
    used: false,
    expired: true,
    expirationDate: '04/08/2017'    
  },
  {
    code: 'WWW',
    name: "Un café offert",
    description: "Sur la dernière collection automne-été 2017",
    value: null,
    valueUnit: null,
    legalNotices: "Offre non cumulable valable en France métropolitaine",
    imageUrl: "https://adm.zerosix.com/static/placeholders/reward.jpg",
    contact: {
      firstName: 'Nico',
      lastName: 'WWWW'
    },
    used: true,
    expired: false,
    expirationDate: '04/04/2017'    
  }
]

export default data