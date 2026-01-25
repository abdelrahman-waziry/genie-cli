module.exports = function (componentName) {
  return `import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ${componentName} from './${componentName}.vue'

describe('${componentName}', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(${componentName})
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct title', () => {
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('${componentName}')
  })

  it('has the correct class', () => {
    expect(wrapper.classes()).toContain('${componentName.toLowerCase()}')
  })

  // Example: Testing reactive data
  it('updates reactive data correctly', async () => {
    // Access component's reactive data
    const vm = wrapper.vm
    
    // Trigger an action that changes data
    // await wrapper.find('button').trigger('click')
    
    // Assert the change
    // expect(vm.someData).toBe(expectedValue)
  })

  // Example: Testing emitted events
  it('emits events correctly', async () => {
    // Trigger an action that emits an event
    // await wrapper.find('button').trigger('click')
    
    // Assert the event was emitted
    // expect(wrapper.emitted()).toHaveProperty('eventName')
    // expect(wrapper.emitted().eventName[0]).toEqual([expectedPayload])
  })

  // Example: Testing with props
  it('accepts and displays props', () => {
    const testWrapper = mount(${componentName}, {
      props: {
        // propName: 'propValue'
      }
    })
    
    // Assert prop is used correctly
    // expect(testWrapper.text()).toContain('propValue')
  })
})
`
}