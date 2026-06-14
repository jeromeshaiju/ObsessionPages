---
title: my solution to knapsacks problem
description: The Knapsack Problem is a classic optimization puzzle in computer science and mathematics. Imagine you have a backpack (knapsack) with a fixed weight capacity, and you have a set of items, each with a specific weight and value. The goal is to determine which items to include so that the total weight is less than or equal to the limit, and the total value is as large as possible.
tags:
  - Python
  - knapsacks-problem
  - genetic-algorithm
pubDate: 2026-06-14
draft: false
---


# Introduction
This has been my attempt on building a genetic algorithm.
Genetic algorithm has been used in many ways especially in the fields of Machine Learning & AI,  Finance & Project Management and most of all Game Development. This blog is designed in a way that its easy for anyone to understand how a genetic function may work. Hope my work is useful to all who came to learn.

# What is Knapsack Problem
The Knapsack Problem is a classic optimization puzzle in computer science and mathematics. Imagine you have a backpack (knapsack) with a fixed weight capacity, and you have a set of items, each with a specific weight and value. The goal is to determine which items to include so that the total weight is less than or equal to the limit, and the total value is as large as possible.


*If you found any errors in my explanation pls feel free to send me a email.*


![Genetic algorithm](attachments/genetic-algorithm.png)




# Functions Required

| Component Name          | Primary Purpose                                                       | Input Parameters                                                                                                                                                        | Output/Result                                    | Problem Specific (Inferred) |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------- |
| **run_evolution**       | Main loop that executes the evolutionary process over generations.    | populate_func: function, fitness_func: function, fitness_limit: int, selection_func: function, crossover_func: function, mutation_func: function, generation_limit: int | Final population and total number of generations | No                          |
| **fitness_function**    | Evaluates the quality of a solution based on problem constraints.     | genome: list, things: list, weight_limit: int                                                                                                                           | int (accumulated value or 0 if invalid)          | Yes                         |
| **selection_function**  | Selects a pair of parents based on their fitness scores.              | population: list, fitness_func: function                                                                                                                                | Two genomes (parents)                            | No                          |
| **crossover_function**  | Combines genetic information from two parents to create offspring.    | a: list (genome), b: list (genome)                                                                                                                                      | Two new genomes (offspring)                      | No                          |
| **mutation_function**   | Introduces random variations in a genome to maintain diversity.       | genome: list, num: int, probability: float                                                                                                                              | A modified genome                                | No                          |
| **generate_population** | Creates a list of multiple genomes to form the starting generation.   | size: int, genome_length: int                                                                                                                                           | List of genomes                                  | No                          |
| **generate_genome**     | Generates a single genetic representation for one potential solution. | k: int (length of the genome)                                                                                                                                           | List of ones and zeros representing a genome     | Yes                         |

^698e27



# fitness_function

```python
  
def fitness_function(genome,wightlim,items)->int:
    sum_of_wieght=0
    sum_val=0
    for i in range(len(genome)):
        if genome[i]==1:
            sum_of_wieght += items[i][1]
            sum_val += items[i][2]
            if sum_of_wieght>wightlim:
                return 0
    return sum_val
```


## choices function in random module
**take parameters**
- population--list of values to be chosen
- weights --- values which will bias the choice for n values there is n biases(idk what happens if there isn't)
- k= number (the number of choices to be chosen)
```python
choices = random.choices(population=population,weights=weights,k=2 )
```


## hinting type in function def
example
```python
def sumoflists(lists) -> list[list[int]]:
```

## selection function
```python
def selection_function(population,fitness_function)-> list[list[int]]:
    return random.choices(
        population=population,
        weights=[partial_fitness_function(genome) for genome in population],
        k=2
    )
```
## cross function
```python
def crossfunction(selectedgenomes)->tuple[list[int]]:
    #we assume both items in selected genome is same length
    cutpoint=random.randrange(len(selectedgenomes[0]))
    child1 = selectedgenomes[0][:cutpoint] + selectedgenomes[1][cutpoint:]
    child2 = selectedgenomes[1][:cutpoint] + selectedgenomes[0][cutpoint:]
    return child1,child2
```
## mutation function
```python
#usr defined probability
def mutation(genome,probability)->list[int]:
    randompoint=random.randrange(len(genome))
    if random.random()<probability:
        if genome[randompoint]==0:
            genome[randompoint]=1
        else:
            genome[randompoint]=0
    return genome
```


![genetic](attachments/genetic.jpg)
*Photo by [Sangharsh Lohakare](https://unsplash.com/@sangharsh_l) on [Unsplash](https://unsplash.com/?utm_source=Obsidian%20Image%20Manager&utm_medium=referral)*

## genome/population creations functions

```python
def populate(population_size,genome_length)->list[list[int]]:
    population=[]
    while len(population)<population_size:
        genome=creategenome(genome_length)
        population.append(genome)
    return population  

def creategenome(genome_length)->list[int]:
    return random.choices([0,1],k=genome_length)
  
```
## elitism function

```python
# fittness_limit is user defined
# here we assume by only taking topmost value in reality the optimal value could also be in topmost indices other than 0th val  
def elitism(population,fittness_limit):
    sorted_population=sorted(population,key=lambda genome: partial_fitness_function(genome),reverse=True)
    top_two=[sorted_population[0],sorted_population[1]]
    print(sorted_population[0],top_two)
    if partial_fitness_function(sorted_population[0])>fittness_limit:
        return sorted_population[0],top_two
    print([],top_two)
    return [],top_two
```

## run function
```python
def run(generational_limit,fittness_limit,probability,population_size):
        population=populate(population_size,genome_length=len(items))
        gencount=0
        while generational_limit>gencount:
            elites=elitism(population,fittness_limit)
            if elites[0] != []:
                print("you should pack")
                for index in range(len(elites[0])):
                    if elites[0][index]==1:
                        print(items[index][0],items[index][2])
                print(elites[0],"has gotten the value in",gencount,"generation for fittest value")

                print("the fittest value recieved is :",partial_fitness_function(elites[0]))
                break
            newpopulation=[]
            for n in range((population_size//2)-2):
                parents=selection_function(population,fitness_function)
                newpopulation.extend(crossfunction(parents))
            newpopulation.extend(elites[1])
            temp=[]
            for genome in newpopulation:
                temp.append(mutation(genome,probability))
            population=temp
            gencount+=1
        else:
            print("you should pack")
            elites=elitism(population,fittness_limit)
            for index in range(len(elites[1][0])):
                if elites[1][0][index]==1:
                    print(items[index][0])
            print(elites[1][0]," got the value at generation limit")
            print("the fittest value recieved is:",partial_fitness_function(elites[1][0]))
```
## predefined values
```python
from functools import partial
import random
items=[

    ["computer", 20, 500],

    ["laptop", 15, 400],

    ["tablet", 8, 250],

    ["phone", 5, 300],

    ["camera", 6, 280],

    ["headphones", 2, 150],

    ["mug", 1, 20],

    ["book", 1, 50],

    ["pen", 1, 5],

    ["notebook", 2, 80],

    ["microphone", 3, 250],

    ["airpods", 1, 200],

    ["joystick", 2, 120],

    ["sock", 1, 2],

    ["mouse", 1, 60],

    ["keyboard", 3, 150],

    ["monitor", 25, 600],

    ["speaker", 4, 220],

    ["webcam", 1, 180],

    ["router", 5, 280]

]

#limit of weight of bags

limit=40
```
## partial function

```python
#partial function to create a new function with fixed weight limit and items list
partial_fitness_function=partial(fitness_function,wightlim=limit,items=items)
```
# starter
```python
generational_limit=int(input("enter the generational limit"))
fittness_limit=int(input("enter the fittness limit"))
probability=float(input("enter the mutation probability"))
population_size=int(input("enter the population size"))
run(generational_limit,fittness_limit,probability,population_size)
```

