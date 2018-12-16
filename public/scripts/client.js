document.getElementById('btn').addEventListener('click', e => {
    e.preventDefault();
    const output = document.getElementById('output');
    const file = document.querySelector('input[type=file]').files[0]
    var reader = new FileReader();
    reader.onloadend = () => {
        output.src = reader.result;

    }
    
    if (file) reader.readAsDataURL(file);
    else output.src = '';


    async function getRes() {
        const model = await tf.loadModel('../data/model.json')
        const pred = await tf.tidy(() => {
            let out = tf.fromPixels(output, 3);
            out = out.expandDims();
            out = tf.image.resizeBilinear(out, [64, 64])
            const res = model.predict(out);
            const datatatata = res.dataSync();
            if (datatatata[0] >= 0.5) {
                document.getElementById('hi').innerHTML = 'It literally looks like a cat. If it isn\'t a cat, then I don\'t know what it is.'
            }
            else document.getElementById('hi').innerHTML = 'It literally looks like a doggo. I mean seriously! It gots to be a doggo.'

        })
    }
    getRes()
    
})
        

