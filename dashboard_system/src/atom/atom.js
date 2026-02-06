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

export const gradeEntryWindowState = atom( {
  key: 'gradeEntryWindowState',
  default: false
} )

export const gradeEntryClickedDataState = atom( {
  key: 'gradeEntryClickedState',
  default: null,
} )

export const gradeEntryLettersState = atom( {
  key: 'gradeEntryLettersState',
  default: "",
} )

export const AdminSelectedState = atom( {
  key: 'AdminSelectedState',
  default: {
    student: false,
    teacher: true
  }
} )

export const LoadingState = atom( {
  key: 'LoadingState',
  default: false
} )

// *********change password modal state
export const changePassMOdalState = atom( {
  key: 'changePassMOdalState',
  default: false
} )