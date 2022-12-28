import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";
import { formAlberto, formJuan } from "../fixtures/formFixtures";


describe('Tests for useForm hook', () => {

    const initialState = {
        name: '',
        age: '23'
    }

    test('should have the initial state as provided', () => {
        const { result } = renderHook( () =>  useForm( initialState ) )
        const [ values ] = result.current

        expect( values ).toEqual( initialState )
    });

    test('should change a value if it is passed in the handleChange', () => {
        const { result } = renderHook( () => useForm( initialState ) )
        const target = formAlberto

        const [ , handleChange ] = result.current

        act( () => {
            handleChange({ target: target })
        })

        const [ values ] = result.current

        expect( values[ target.name ] ).toBe( target.value )
    });

    test('should set the values with the setValues function', () => {
        const { result } = renderHook( () => useForm( initialState ) )
        const [ ,, setValues ] = result.current

        act( () => {
            setValues( formJuan )
        })

        const [ values ] = result.current

        expect( values ).toEqual( formJuan )
    });

    test('should reset the values', () => {
        const { result } = renderHook( () => useForm( initialState ) )
        const [ ,,, reset ] = result.current

        act( () => {
            reset()
        })
        
        const [ values ] = result.current
        
        expect( values ).toEqual( initialState )
    });
    
});