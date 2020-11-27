# [Law of Large Numbers](https://yuvraj97.github.io/stats.github.io/data/index/intro/./lln-clt/#lln) Simulation
Here I simulated the Law of Large Numbers and shown that average → 𝜇 as n → ∞  
Here I had shown LLN for,  
- Normal Distribution  N(𝜇,𝜎) 
    ![normal](/data/notebook-img/Normal.png)
- Exponential Distribution  Exp(𝜆) 
    ![exp](/data/notebook-img/Ber.png)
- Bernoulli Distribution  Ber(𝑝) 
    ![ber](/data/notebook-img/Exp.png)
- Geometric Distribution  Geo(𝑝)  
    ![geo](/data/notebook-img/Geo.png)

You can simulate LLN for any distribution, just fed in the distribution in **lln()** function.  
**lln()** function is in [lln.jl](lln.jl) file.