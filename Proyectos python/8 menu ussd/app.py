'''
Module to print a USSD menu, get users inputs and deliver responses
This modules uses Africans Talking to make USSD Menu
It is necessary to use NGRok to expose localhost to Africans Talking app
'''

# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, render_template, make_response

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
# ‘/’ URL is bound with ussd_menu() function.
def ussd_menu():
    '''
    Function to print and deliver responses of usssd menu
    '''
    global response

    phone_number = request.values.get("phoneNumber",None)
    text = request.values.get("text","default")

    if text == "":
        response = "CON Tecmilenio - seleciona acción\n"
        response += "1. Mi cuenta\n"
        response += "2. Mi suscripción"

    elif text == "1":
        response = "CON Que acción quieres realizar en tu cuenta?\n"
        response += "1. Consultar NAO ID\n"
        response += "2. Consultar Estado de Cuenta"        

    elif text == "2":
        response = "CON Que acción quieres realizar en tu suscripción?\n"
        response += "1. Consultar estatus\n"
        response += "2. Consultar balance\n"
        response += "3. Cancelar suscripción"

    elif text == "1*1":
        nao_id = "AN2013"
        response = "END Tu NAO Id relacionado al número {} es {}".format(phone_number, nao_id)

    elif text == "1*2":
        response = "END Tu estado de cuenta relacionado al número {} ha sido enviado".format(phone_number)

    elif text == "2*1":
        estatus = "Activo"
        reto_actual = "Reto 5 - Errores en lenguajes de programación"
        modalidad = "Fast Track"
        if estatus == "Activo":
            response = "END Estás {} cursando el reto {} en modalidad {}".format(estatus, reto_actual, modalidad)
        else:
            response = "END Tu cuenta está desactivada, contacta al área de soporte"

    elif text == "2*2":
        response = "END Actualmente tienes un saldo vencido de 7,564 pesos."        

    elif text == "2*3":
        response = "END Tu cuenta ha sido dada de baja, revisa detalles en tu correo."        

    else:
        response = "END Opción invalida, intenta nuevamente."

    return response

# main driver function
if __name__ == '__main__':
    '''
    App entry point
    '''
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True)