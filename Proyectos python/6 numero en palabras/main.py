'''
Module to convert a number to letters. 
It uses num2word module to make the convertion.
'''
import num2words

#Language to print letters
language='es'

def start_flow():
    '''
    Function to run the main convertion process
    '''
    print("Este programa convierte un número a letras")
    input_number = input("Ingresa un número:")
    if isEmpty(input_number):
        print("Debes ingresar un valor.")
    elif not validate_only_numbers(input_number):
        print("Solo se permiten números.")    
    else:
        letters = convert_number_to_letters(input_number)
        print(letters)

def convert_number_to_letters(number):
    '''
    Function to convert the number to letters with num2words
    '''
    return num2words.num2words(number, lang=language)

def validate_only_numbers(val):
    '''
    Function to validate only numbers to avoid convertion errors
    '''
    return val.isnumeric()

def isEmpty(val):
    '''
    Function to vlidate if value is empty
    '''
    flag = False
    if val == "" or val == " " or val == None:
        flag = True
    return flag

if __name__ == '__main__':
    '''
    Entry point of script
    '''
    start_flow()