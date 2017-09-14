# dpcc

Digital Preservation Cost Calculator

## Initial Brainstorm

```
Dimensions
[$] money
[B] storage
[T] time

Units
dollars, terabytes, years

User supplied inputs
- service (sets the rates and variables)
- amount [B] (e.g., "50 TB")
- time [T] (e.g., "5 years")

Rates
ingest cost    [$]/[B]
membership fee [$]/[T]
storage rate   [$]/[B][T]
retrieval rate [$]/[B][T]

Variables
included storage   [B]
included retrieval [B]
storage increment  [B] (e.g., APTrust sells storage in 5TB increments)

Formulas
storage cost = storage rate * ceiling(non_negative(amount - included storage)/storage increment) * storage increment

function non_negative(x) {
  return x >= 0 ? x : 0;
}
```
