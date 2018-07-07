import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor(){
        super()
        this.state = {result:"", answer: ""};
        this.operators =['AC','DEL','-','+','*','/'];
  }
  calculateResult(){
    const text = this.state.result;
    try {
      this.setState({
        answer: eval(text)
      });
    } 
    catch(error) {
      this.setState({
        answer: "Invalid Input"
      });
    }
  }
  validate(){
    const text = this.state.result;
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }
  buttonPressed(text){
    if(text== '=')
      return this.validate() && this.calculateResult();
    if(this.state.result=='0' && text=='0')
    {
        return;
    }
    this.setState({
      result: this.state.result + text
    });
  }
  operate(operation){
    switch(operation){
      case 'AC':
        this.setState({
          result: "",
          answer: ""
        });
        return;
      case 'DEL':
        let text = this.state.result.split('');
        text.pop();
        this.setState({
          result : text.join('')
        });
        return;
      case '-':
      case '+':
      case '*':
      case '/':
        const lastChar = this.state.result.split('').pop();
        if(this.operators.indexOf(lastChar)>0) return;
        if( this.state.result == "") return;
        this.setState({
          result: this.state.result + operation
        });
    }
  }

    render(){
      const { operationStyle, buttonStyle, rowStyle, padTextStyle, resultStyle} = styles;
      let nums = [[1,2,3], [4,5,6], [7,8,9], ["." ,0, "="]];
      let padItems =[]
      for(let i=0;i<4;i++)
      {
        let row =[]
        for(let j=0;j<3;j++)
        {
          row.push(<TouchableOpacity key={nums[i][j]} onPress={()=> this.buttonPressed(nums[i][j])} style ={buttonStyle}>
              <Text style={padTextStyle}> {nums[i][j] }</Text>
            </TouchableOpacity>);
        }
        padItems.push(<View key={"pad"+i} style={rowStyle}>{row}</View>);
      }

      let oper = [];
      for(let i=0;i<6;i++)
      {
          oper.push(<TouchableOpacity key={this.operators[i]} onPress={ ()=>this.operate(this.operators[i]) } style ={ styles.mybuttonStyle}>
              <Text style={padTextStyle}> { this.operators[i]}</Text>
            </TouchableOpacity>);
      }

      return(
        <View style = {styles.containerStyle}>
          
          <View style={styles.calculateStyle}>
            <Text style={styles.calculateTextStyle}>{ this.state.result }</Text>
          </View>
          <View style={resultStyle}>
            <Text style={styles.resultTextStyle}>{ this.state.answer }</Text>
          </View>

          <View style={styles.padStyle}>
            <View style={styles.buttonStyleBack}>
              { padItems }
            </View>
            <View style={styles.operationStyle}>
              { oper }
            </View>
          </View>
        <View style={styles.footer} >
          <Text style= {styles.footerText}> Created by Aurobindo Debnath </Text>
        </View>
      </View>
      );
  }
}


const styles = {
  footer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  footerText: {
    fontSize: 10,
    color: '#eee'
  },
  containerStyle : {
    flex: 1,
    backgroundColor: "#aaa"
  },
  calculateStyle : {
    flex: 2,
    backgroundColor: '#eee',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5
  },
  resultStyle : {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
  },
  padStyle : {
    flex: 6,
    flexDirection: "row"
  },
  buttonStyle : {
    flex: 1,
    backgroundColor: '#434343',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonStyleBack: {
    flex: 3,
    backgroundColor: '#454545',
    elevation: 1,
    shadowOffset: { width: 2, height: 2},
    shadowColor: '#000'
  },
  operationStyle : {
    flex: 1,
    backgroundColor: '#656565',
  },
  mybuttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#636363',
    flexDirection: "row"
  },

  rowStyle: {
    flex: 1,
    flexDirection: "row"
  },
  padTextStyle:{
    fontSize: 24,
    color: "white"
  },
  calculateTextStyle:{
    fontSize: 38,
    fontWeight: '600'
  },
  resultTextStyle: {
    fontSize: 24,
  }
};

export default App;