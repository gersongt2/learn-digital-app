import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Question = ({ question, options, onChange, selectedAnswer }) => {
  return (
    <View style={styles.question}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <CheckBox
          key={index}
          title={option}
          checked={selectedAnswer === option}
          onPress={() => onChange(option)}
        />
      ))}
    </View>
  );
};

const LessonScreen = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  const toggleQuiz = () => setShowQuiz(!showQuiz);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const submitQuiz = () => {
    const correctAnswers = {
      q1: 'B', // A resposta correta para a pergunta 1
      q2: 'A', // A resposta correta para a pergunta 2
    };

    let score = 0;
    for (let key in correctAnswers) {
      if (answers[key] === correctAnswers[key]) {
        score += 1;
      }
    }

    setQuizResults(`Você acertou ${score} de ${Object.keys(correctAnswers).length} questões.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Introdução ao Uso de Smartphones</Text>
        <Text style={styles.paragraph}>
          Neste módulo, você aprenderá a utilizar seu smartphone de forma eficaz. Vamos começar com algumas noções básicas
          sobre a interface e as funcionalidades essenciais do dispositivo.
        </Text>

        <TouchableOpacity style={styles.button} onPress={toggleQuiz}>
          <Text style={styles.buttonText}>{showQuiz ? 'Ocultar Quiz' : 'Iniciar Quiz'}</Text>
        </TouchableOpacity>

        {showQuiz && (
          <View style={styles.quizContainer}>
            <Text style={styles.subHeader}>Quiz: Teste seus conhecimentos!</Text>
            <Question
              question="1. O que é uma tela inicial no smartphone?"
              options={[
                'A. A tela de bloqueio',
                'B. A tela onde você acessa seus aplicativos',
                'C. A tela do menu de configurações'
              ]}
              onChange={(answer) => handleAnswerChange('q1', answer)}
              selectedAnswer={answers['q1']}
            />
            <Question
              question="2. Qual é a função do botão 'Home'?"
              options={[
                'A. Voltar para a tela inicial',
                'B. Abrir a câmera',
                'C. Aumentar o volume'
              ]}
              onChange={(answer) => handleAnswerChange('q2', answer)}
              selectedAnswer={answers['q2']}
            />
            <Button title="Enviar Respostas" onPress={submitQuiz} />
            {quizResults && <Text style={styles.results}>{quizResults}</Text>}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizContainer: {
    marginTop: 20,
  },
  question: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  results: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
});

export default LessonScreen;
