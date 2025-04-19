#!/bin/bash

# Simple Interest Calculator

echo "Enter the Principal amount:"
read principal

echo "Enter the Rate of interest:"
read rate

echo "Enter the Time (in years):"
read time

# Calculate Simple Interest
interest=$(echo "scale=2; ($principal * $rate * $time) / 100" | bc)

echo "The Simple Interest is: $interest"
