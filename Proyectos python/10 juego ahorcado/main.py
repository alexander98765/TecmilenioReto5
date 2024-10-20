'''
Module to create the popular game hangman
It uses txt files to for user to choose between easy or hard difficulty
'''
import random

'''Declaraction of global variables'''
difficulty = ""
word = ""
letters = []
guessed = []
tries = 0

def chose_difficulty():
    '''
    Function for user to chose game difficulty.
    '''
    global difficulty
    difficulty = input("Elige dificultad (facil/dificil):")
    if difficulty == "facil":
        print("Elegiste dificultad facil")
        open_words()
        start_game()
    elif difficulty == "dificil":
        print("Elegiste dificultad dificil")
        open_words()
        start_game()
    else:
        print("No se eligio una dificultad válida")
    
def open_words():
    '''
    Function to open certain file depending on difficulty
    '''
    file_name = ""
    global word
    if difficulty == "facil":
        file_name = "palabras_facil.txt"
    else:
        file_name = "palabras_dificil.txt"

    with open(file_name, "r") as words_file:
        words = words_file.readlines()
        if words:
            word = str(random.choice(words)).strip()            

def draw_body(fails: int):
    '''
    Function to draw updated body 
    '''
    lose = 6
    body = {
        1: "O",
        2: "|",
        3: "---",
        4: "|", 
        5: "/",
        6: "\\"
    }
    
    print("- - - -")
    print("-   |")
    y = 0
    for _ in range(6):
        y += 1
        if y <= fails:
            print("-", end="")
            if y <= 5:
                if y == lose - 1 and fails == lose:
                    print(" " * 2 + "/ \\")
                else:
                    spaces = 3 if len(body[y]) == 1 else 2
                    print(" " * spaces, end="")
                    print(body[y])
        else:
            print("-")
    print("- - - - \n")
    
def find_coincidence(letter: str = ""):
    '''
    Function to find coincidence in word or letter
    '''
    if letter in word:
        for i, w in enumerate(word):
            if w == letter and letters[i] == '_':
                letters[i] = letter
                guessed.append(letter)
                return True
        return False

def start_game():
    '''
    Function that contains the whole game flow
    '''
    for _ in range(len(word)):
        letters.append('_')
    global tries
    print(letters)
    while True:
        draw_body(tries)
        
        print(f"Tu palabra es: {' '.join(letters)}")
        print(f"Letras adivinadas: {' '.join(guessed)}")
        
        letter = input("Ingresa una letra: ")
        
        guess = find_coincidence(letter)

        if not guess:
            tries += 1
            if tries == 6:
                draw_body(tries)
                print("Juego perdido, no pudiste descifrar la palabra. La palabra es: " + word)
                break
            else:
                print(f"La letra {letter} no se encuentra en la palabra")
        else:
            if ''.join(letters) == word: 
                print(f"Ganaste!!! la palabra es {word}")
                break
            else:
                print("¡Haz encontrado una letra!")
        print("\n")

if __name__ == '__main__':
    '''
    Entry point of script
    '''
    chose_difficulty()