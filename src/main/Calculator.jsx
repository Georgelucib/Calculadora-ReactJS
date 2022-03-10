import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const  initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            
            const values = [...this.state.values]
            

            
            
            try{
                values[0] = eval (`${values[0]} ${currentOperation} ${values[1]}`)
    
            } catch(e){
                values[0] = this.state.values[0]
            }

        

            values[1] = 0 

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1, 
                clearDisplay: !equals,
                values
            })

            
        }
    }

    addDigit(n){

        //Se o valor de n que quero inserir for '.' e o valor '.' já estiver na calculadora = retorna a função}
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }

        //Clear display será chamado caso a calculadora estiver com o número 0 ou se a variável for verdadeira do estado
        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay

        //Caso precise limpar o display o valor corrente será vazio e caso n precisar será o valor que já está no display
        const currentValue = clearDisplay ? '' : this.state.displayValue 

        //Novo valor do display será o current value + a variável n 
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay:false})

        if(n !== '.') {
            //Armazenando no i qual o índice do array que está sendo manipulado
            const i = this.state.current

            const newValue = parseFloat(displayValue)

            //Clonar o array
            const values = [...this.state.values]

            // Caso esteja manipulando o valor [0] ele receberá um novo valor, caso esteja manipulando o valor [1] ele receberá um novo valor
            values[i] = newValue

            //Adicionando o array no estado do objeto
            this.setState({ values })
            console.log(values)
        }
            
    }


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory}triple />
                <Button label="/" click={this.setOperation}operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation}operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation}operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+"click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation}operation/>
            </div>
        )
    }
}