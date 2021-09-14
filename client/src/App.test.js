import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import FormItem from "../src/components/FormItem.jsx"
import '@testing-library/jest-dom/extend-expect'


test('renders learn react link', () => {
    render( < App / > );
    const linkElement = screen.getByAltText(App);
    expect(linkElement).toBeInTheDocument();

});
test('Recibe la propiedad label', () => {

            const form = render( < FormItem label = { "hola" }
                />);
                expect(form.container).toHaveTextContent("hola")

            }); test('Recibe la propiedad error', () => {

                const form = render( < FormItem error = { "error" }
                    />);
                    expect(form.container).toHaveTextContent("error")

                });

            const setup = () => {
                    const utils = render( < FormItem type = { "number" }
                        name = { "a" }
                        />)
                        const input = utils.getByLabelText("a")
                        return {
                            input,
                            ...utils,
                        }
                    }

                    test('El input de tipo number recibe los numeros correctamente', () => {
                        const { input } = setup()
                        fireEvent.change(input, { target: { value: '23' } })
                        expect(input.value).toBe('23')
                    })

                    test('El input de tipo number no permite letras ', () => {
                        const { input } = setup()
                        expect(input.value).toBe('')
                        fireEvent.change(input, { target: { value: 'soyHenry' } })
                        expect(input.value).toBe('')
                    })