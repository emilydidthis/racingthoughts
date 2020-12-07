window.onload = function(e){
    d3.csv("RT-DataOnlyWTags.csv")
        .then(function(rawData) {
        console.log(rawData);
        let data = rawData.map(d => {
            const obj = {
            neg_tags: d['neg_tags'].split(',').map(t => t.trim()),
            pos_tags: d['pos_tags'].split(',').map(t => t.trim()),
            neg_resp: d['neg_resp'],
            pos_resp: d['pos_resp'],
            neg_time: +d['neg_time'],
            pos_time: +d['pos_time'],
            neg_pause: +d['neg_time'] - (d['neg_resp'].length/4),
            pos_pause: +d['pos_time'] - (d['pos_resp'].length/4)
            }
            return obj;
        })

        data = data.sort(() => Math.random() - 0.5);

        //array of tags only
        let tagsArray = [];
        for (let i = 0; i < data.length; i++){
            //filter out string lengths that are 0
            let arrayNow = (data[i]['neg_tags']).concat(data[i]['pos_tags']).filter(e => e.length);
            tagsArray = tagsArray.concat(arrayNow);
        }

        //if tag from tagsArray exists, increment its key value
        //if it doesn't exist, create a new object in tags
        let tags = {};
        for (let i = 0; i < tagsArray.length; i++) {
            let key = tagsArray[i];
            if (key in tags) {
                tags[key] += 1;
            }
            else tags[key] = 1;
        }
        
        for (let i = 0; i < data.length; i++){
            let p = document.createElement('p');

            let neg_thought = document.createElement('span');

            neg_thought.innerHTML += '<span aria-hidden="true" class="cursor"></span>';
            let test = document.getElementById("test")
            test.innerHTML = data[i]['neg_resp'];
    
            let width = test.clientWidth + 1 + "px";
            neg_thought.style.width = width;
           // neg_thought.style.height = "1.2em";

            neg_thought.className = 'neg';
            p.appendChild(neg_thought);
            StartTextAnimation(neg_thought, data[i]['neg_resp'], data[i]['neg_pause']);

        
            let pos_thought = document.createElement('span');

            pos_thought.innerHTML += '<span aria-hidden="true" class="cursor"></span>';
            test.innerHTML = data[i]['pos_resp'];
            width = test.clientWidth + 1 + "px";
            pos_thought.style.width = width;
            //pos_thought.style.height = "1.2em";

            pos_thought.className = 'pos';
            p.appendChild(pos_thought);
            StartTextAnimation(pos_thought, data[i]['pos_resp'], data[i]['pos_pause']);

            document.getElementById('quotes').appendChild(p);



            // document.getElementById('quotes').innerHTML += `<br>
            // <p><span class="neg">${data[i]['neg_resp']}</span> 
            // <span class="pos">${data[i]['pos_resp']}</span></p>`;
        }
        
        // array with texts to type in typewriter
        var dataText = [ "Amsterdam.", "Full Service.", "Webdevelopment.", "Wij zijn Occhio!"];
        
        // type one text in the typwriter
        // keeps calling itself until the text is finished
        function typeWriter(span, text, i, pause) {
            // check if text isn't finished yet
            if (i < (text.length)) {
            // add next character to h1
            span.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true" class="cursor"></span>';

            // wait for a while and call this function again for next character
            setTimeout(function() {
                typeWriter(span, text, i + 1, pause)
            }, 100);
            }
            // text finished, call callback if there is a callback function
            else {
            // call callback after timeout
            setTimeout(() => typeWriter(span, text, 0, pause), pause * 1000);
            }
        }

        function StartTextAnimation(span, text, pause) {
            if (pause < 0) pause = 0;
            setTimeout(function() {
            typeWriter(span, text, 0, pause);
            }, pause * 1000);
        }

        // start the text animation
        //StartTextAnimation(0);
    })


    
}