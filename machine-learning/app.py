from flask import Flask, jsonify, request
from main import analisar_consumo

# Cria a aplicação Flask.
app = Flask(__name__)


# Rota inicial para verificar se a API está funcionando.
@app.route('/', methods=['GET'])
def inicio():
    return jsonify({
        "mensagem": "API de Machine Learning do Expotech funcionando!",
        "status": "online"
    })


# Rota para analisar o consumo de um aparelho.

@app.route('/api/analisar-consumo', methods=['POST'])
def analisar():
    dados = request.get_json(silent=True)

    if not isinstance(dados, dict):
        return jsonify({
            "erro": "Envie um objeto JSON válido."
        }), 400

    try:
        resultado = analisar_consumo(
            dados.get('aparelho'),
            dados.get('consumos')
        )

        return jsonify(resultado), 200

    except ValueError as erro:
        return jsonify({
            "erro": str(erro)
        }), 400


# Inicia o servidor Python.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)