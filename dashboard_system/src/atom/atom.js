import { atom } from 'recoil'

export const showMenu = atom( {
  key: 'showMenu',
  default: false
} )

export const Open = atom( {
  key: 'Open',
  default: false
} )

export const modalData = atom( {
  key: 'modalData',
  default: []
} )

export const roleMethodState = atom( {
  key: 'roleMethodState',
  default: {
    student: false,
    sbo_admin: false,
    registrar_admin: false,
    super_admin: false
  }
} )

export const userDataState = atom( { //.....
  key: 'userDataState',
  default: []
} )

export const formDataState = atom( {
  key: 'formDataState',
  default: {
    id: null,
    password: null,
  }
} )

export const gradeEntryWindowState = atom( {
  key: 'gradeEntryWindowState',
  default: false
} )

export const gradeEntryDataState = atom( {
  key: 'gradeEntryDataState',
  default: {
    Mathematics: 0,
    English_Literature: 0,
    Chemistry: 0,
    History: 0,
    physics: 0
  }
} )

export const gradeEntryClickedDataState = atom( {
  key: 'gradeEntryClickedState',
  default: 0,
} )

export const gradeEntryClickedNowState = atom( {
  key: 'gradeEntryClickedNowState',
  default: "",
} )

export const gradeEntryLettersState = atom( {
  key: 'gradeEntryLettersState',
  default: "",
} )
