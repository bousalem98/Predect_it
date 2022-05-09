from flask import Flask, request, jsonify
import utils

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello():
    return "hello"

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': utils.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    land_area = float(request.form['land_area'])
    floor_area = float(request.form['floor_area'])
    SUBURB = request.form['SUBURB']
    bedrooms = int(request.form['bedrooms'])
    bathrooms = int(request.form['bathrooms'])
    garage = int(request.form['garage'])
    build_year = float(request.form['build_year'])
    response = jsonify({
        'estimated_price': utils.get_estimated_price(SUBURB,land_area,floor_area,bedrooms,bathrooms,garage,build_year)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    utils.load_saved_artifacts()
    app.run()