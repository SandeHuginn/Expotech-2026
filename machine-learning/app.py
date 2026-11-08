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
    dados = request.get_json()

    # Verifica se os dados foram enviados corretamente.
    if not dados or 'aparelho' not in dados or 'consumos' not in dados:
        return jsonify({
            "erro": "Informe o aparelho e a lista de consumos."
        }), 400

    # Executa o algoritmo de Machine Learning.
    resultado = analisar_consumo(
        dados['aparelho'],
        dados['consumos']
    )

    return jsonify(resultado)


# Inicia o servidor Python.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)