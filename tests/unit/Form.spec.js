import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Form from '@/components/Form.vue'
import FormUtils from '@/utils/FormUtils.js'

const CORRECT_EMAIL = 'correct@email.com'
const WRONG_EMAIL = 'wrong@email'

const CORRECT_PASSWORD = 'strongEnough'
const WRONG_PASSWORD = 'short'
const WRONG_RE_PASSWORD = 'strongEnoug'
const SUCCESS_FORM = { success: true }


// OPEN: https://vuejs.org/v2/guide/testing.html

// UNIT TESTING
// https://jestjs.io/docs/en/using-matchers
// https://jestjs.io/docs/en/expect
describe('UNIT TESTING', () => {

  it('Should validate email', () => {
    const invalidEmail = FormUtils.validateEmail(WRONG_EMAIL)
    const validEmail = FormUtils.validateEmail(CORRECT_EMAIL)

    expect(invalidEmail).toBe(false) // Invalid
    expect(validEmail).toBe(true) // Valid
  })

  it('Should validate password', () => {
    const invalidPassword = FormUtils.validatePassword(WRONG_PASSWORD)
    const validPassword = FormUtils.validatePassword(CORRECT_PASSWORD)

    expect(invalidPassword).toBe(false) // Invalid
    expect(validPassword).toBe(true) // Valid
  })

  it('Should validate re-password', () => {
    const invalidRePassword = FormUtils.validateRePassword(CORRECT_PASSWORD, WRONG_RE_PASSWORD)
    const validRePassword = FormUtils.validateRePassword(CORRECT_PASSWORD, CORRECT_PASSWORD)

    expect(invalidRePassword).toBe(false) // Invalid
    expect(validRePassword).toBe(true) // Valid
  })

})


// INTEGRATION TESTING
// https://vue-test-utils.vuejs.org/api/options.html#data
describe('INTEGRATION TESTING', () => {

  it('Should validate form', () => {
    const wrapper = shallowMount(Form, {
      data() {
        return {
          credentials: {
            email: CORRECT_EMAIL,
            password: CORRECT_PASSWORD,
            re_password: CORRECT_PASSWORD,
          },
        }
      }
    })

    console.log("WRAPPER", wrapper)

    const response = wrapper.vm.validateForm()
    
    expect(response).toEqual(SUCCESS_FORM)
  })
  
})


// COMPONENT TESTING
// https://www.youtube.com/watch?v=LxXsGNXsMo8&ab_channel=FrontendLove
describe('COMPONENT TESTING', () => {

  it('Should show message error', async () => {
    const wrapper = shallowMount(Form, {
      data() {
        return {
          credentials: {
            email: WRONG_EMAIL
          },
        }
      }
    })

    wrapper.vm.submitForm()
    await nextTick()
    // Vue.nextTick( () => {
      const messageError = wrapper.find('.error-message')
      expect(messageError.exists()).toBe(true)
      expect(messageError.text()).toBe('Invalid email')
    // })
  })
  
  it('Should not show message error', () => {
    const wrapper = shallowMount(Form, {
      data() {
        return {
          credentials: {
            email: WRONG_EMAIL,
            passwrod: CORRECT_PASSWORD,
            rePassword: CORRECT_PASSWORD
          },
        }
      }
    })

    wrapper.vm.submitForm()
    const messageError = wrapper.find('.error-message')
    expect(messageError.exists()).toBe(false)
  })

})


// E2E TESTING
describe('E2E TESTING', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Form)
  })

  it('Should validate email', () => {
    const emailInput = wrapper.find('#email-input')

    emailInput.setValue(WRONG_EMAIL)
    const invalidEmail = wrapper.vm.validateEmail()
    
    emailInput.setValue(CORRECT_EMAIL)
    const validEmail = wrapper.vm.validateEmail()

    expect(invalidEmail).toBe(false) // Invalid
    expect(validEmail).toBe(true) // Valid
  })

  it('Should validate password', () => {
    const passwordInput = wrapper.find('#password-input')

    passwordInput.setValue(WRONG_PASSWORD)
    const invalidPassword = wrapper.vm.validatePassword()
    
    passwordInput.setValue(CORRECT_PASSWORD)
    const validPassword = wrapper.vm.validatePassword()

    expect(invalidPassword).toBe(false) // Invalid
    expect(validPassword).toBe(true) // Valid
  })

  it('Should validate form', () => {
    const emailInput = wrapper.find('#email-input')
    const passwordInput = wrapper.find('#password-input')
    const rePasswordInput = wrapper.find('#re_password-input')

    emailInput.setValue(CORRECT_EMAIL)
    passwordInput.setValue(CORRECT_PASSWORD)
    const invalidForm = wrapper.vm.validateForm()
    expect(invalidForm).not.toEqual(SUCCESS_FORM)

    rePasswordInput.setValue(CORRECT_PASSWORD)
    const validForm = wrapper.vm.validateForm()
    expect(validForm).toEqual(SUCCESS_FORM)
  })

})


// Vuex 
// Axios 
// Login testing (log in, save token in localstorage and change route) 
// Validate input filter (just numbers)
// Validate enter on input (todo Item)
// Validate enter on completed (todo Item)
// Validate 
