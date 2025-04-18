System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, SudokuCore, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4a6fegPWqZOu6oCTu6Iu6qx", "SudokuCore", undefined);

      // --- START OF FILE sudoku_core.ts ---
      _export("default", SudokuCore = class SudokuCore {
        constructor() {
          // Row labels
          this.COLS = SudokuCore.DIGITS;
          // Column labels
          this.SQUARES = null;
          // Square IDs ["A1", "A2", ..., "I9"]
          this.UNITS = null;
          // All units (row, column, or box), each unit is string[]
          this.SQUARE_UNITS_MAP = null;
          // Squares -> units map
          this.SQUARE_PEERS_MAP = null;
          // Squares -> peers map
          this.MIN_GIVENS = 17;
          // Minimum number of givens
          this.NR_SQUARES = 81;
          this.BLANK_CHAR = '.';
          this.BLANK_BOARD = "...................................................." + ".............................";
        }

        // It's recommended to call initialize() immediately after instantiation,
        // or call it from a constructor if automatic initialization is desired.
        initialize() {
          console.log('sudoku initialize');
          this.SQUARES = this._cross(SudokuCore.ROWS, this.COLS);
          this.UNITS = this._get_all_units(SudokuCore.ROWS, this.COLS); // Non-null assertions (!) are used here assuming initialize is called correctly.

          this.SQUARE_UNITS_MAP = this._get_square_units_map(this.SQUARES, this.UNITS);
          this.SQUARE_PEERS_MAP = this._get_square_peers_map(this.SQUARES, this.SQUARE_UNITS_MAP);
        }

        generate(difficulty, unique) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES) {
            throw new Error("SudokuCore not initialized. Call initialize() first.");
          }

          let difficultyLevel;

          if (typeof difficulty === "string") {
            difficultyLevel = SudokuCore.DIFFICULTY[difficulty] || SudokuCore.DIFFICULTY.easy;
          } else if (typeof difficulty === "number") {
            difficultyLevel = difficulty;
          } else {
            difficultyLevel = SudokuCore.DIFFICULTY.easy;
          } // Force difficulty between 17 and 81 inclusive


          difficultyLevel = this._force_range(difficultyLevel, this.NR_SQUARES, // max is exclusive in _force_range, but logic implies inclusive here? Adjusting max.
          this.MIN_GIVENS); // Let's adjust _force_range or the call to match the comment "between 17 and 81 inclusive"
          // Assuming _force_range's max is exclusive, we need NR_SQUARES + 1

          difficultyLevel = this._force_range(difficultyLevel, this.NR_SQUARES + 1, this.MIN_GIVENS); // Default unique to true

          const isUnique = unique === undefined ? true : unique; // Explicit boolean check
          // Get a set of squares and all possible candidates for each square
          // Use BLANK_BOARD constant

          let candidates = this._get_candidates_map(this.BLANK_BOARD); // Check if candidates generation failed (shouldn't for blank board, but good practice)


          if (!candidates) {
            console.error("Failed to get initial candidates for a blank board."); // Retry generation

            return this.generate(difficulty, unique);
          } // For each item in a shuffled list of squares


          const shuffled_squares = this._shuffle(this.SQUARES); // SQUARES is guaranteed non-null here


          for (const square of shuffled_squares) {
            // If an assignment of a random choice causes a contradiction, give up and try again
            const candidatesForSquare = candidates[square];

            if (!candidatesForSquare || candidatesForSquare.length === 0) {
              // Should not happen in this algorithm flow unless board became invalid
              break; // Break loop and retry generation
            }

            const rand_candidate_idx = this._rand_range(candidatesForSquare.length);

            const rand_candidate = candidatesForSquare[rand_candidate_idx]; // _assign returns false on contradiction

            const assignmentResult = this._assign(candidates, square, rand_candidate);

            if (!assignmentResult) {
              // Contradiction found, break and retry generation
              break;
            } // Update candidates map with the result (as _assign modifies it)


            candidates = assignmentResult; // Make a list of all single candidates (solved squares)

            const single_candidates = [];

            for (const sq of this.SQUARES) {
              // Use SQUARES which is non-null
              if (candidates[sq].length === 1) {
                single_candidates.push(candidates[sq]);
              }
            } // If we have at least difficultyLevel filled squares, and the unique candidate count is
            // at least 8 (ensures some variety), return the puzzle!


            if (single_candidates.length >= difficultyLevel && this._strip_dups(single_candidates).length >= 8) {
              let board = "";
              const givens_idxs = [];

              for (let i = 0; i < this.SQUARES.length; i++) {
                const sq = this.SQUARES[i];

                if (candidates[sq].length === 1) {
                  board += candidates[sq];
                  givens_idxs.push(i);
                } else {
                  board += this.BLANK_CHAR;
                }
              } // If we have more than `difficultyLevel` givens, remove some random
              // givens until we're down to exactly `difficultyLevel`


              let nr_givens = givens_idxs.length;

              if (nr_givens > difficultyLevel) {
                let shuffled_givens_idxs = this._shuffle(givens_idxs);

                const boardChars = board.split(''); // Modifiable array

                for (let i = 0; i < nr_givens - difficultyLevel; ++i) {
                  const target_index = shuffled_givens_idxs[i]; // Index is already a number

                  boardChars[target_index] = this.BLANK_CHAR;
                }

                board = boardChars.join('');
              } // Double check board is solvable
              // TODO: Make a standalone board checker. Solve is expensive.


              if (this.solve(board)) {
                return board;
              } // If not solvable (should be rare here), loop continues / eventually retries

            }
          } // Give up and try a new puzzle


          return this.generate(difficulty, unique);
        } // Solve
        // -------------------------------------------------------------------------


        solve(board, reverse = false) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES || !this.SQUARE_PEERS_MAP || !this.SQUARE_UNITS_MAP) {
            throw new Error("SudokuCore not initialized. Call initialize() first.");
          }

          const report = this.validate_board(board);

          if (report !== true) {
            throw new Error(report); // Throw Error object
          } // Check number of givens is at least MIN_GIVENS


          let nr_givens = 0;

          for (const char of board) {
            if (char !== this.BLANK_CHAR && this._in(char, SudokuCore.DIGITS)) {
              ++nr_givens;
            }
          }

          if (nr_givens < this.MIN_GIVENS) {
            throw new Error("Too few givens. Minimum givens is " + this.MIN_GIVENS);
          }

          const candidates = this._get_candidates_map(board); // Check if initial propagation led to contradiction


          if (!candidates) {
            return false;
          }

          const result = this._search(candidates, reverse);

          console.log("Search result:", result); // Keep original log

          if (result) {
            let solution = ""; // Ensure SQUARES is available and iterate in order

            for (const square of this.SQUARES) {
              solution += result[square];
            }

            return solution;
          }

          return false;
        }

        get_candidates(board) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES) {
            throw new Error("SudokuCore not initialized. Call initialize() first.");
          } // Assure a valid board


          const report = this.validate_board(board);

          if (report !== true) {
            throw new Error(report);
          } // Get a candidates map


          const candidates_map = this._get_candidates_map(board); // If there's an error (contradiction), return null


          if (!candidates_map) {
            return null;
          } // Transform candidates map into grid


          const rows = [];
          let cur_row = [];
          let i = 0; // Iterate in the correct square order

          for (const square of this.SQUARES) {
            const candidates = candidates_map[square];
            cur_row.push(candidates);

            if (i % 9 === 8) {
              rows.push(cur_row);
              cur_row = [];
            }

            ++i;
          }

          return rows;
        }

        _get_candidates_map(board) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES) {
            // This is a private method, initialization should be guaranteed by public callers
            // but adding a check for robustness or if called internally before init.
            console.error("_get_candidates_map called before initialization.");
            return false;
          } // Assure a valid board


          const report = this.validate_board(board);

          if (report !== true) {
            // Throwing error might be better, but returning false matches original logic flow
            console.error("Invalid board passed to _get_candidates_map:", report);
            return false; // throw new Error(report); // Alternative
          }

          const candidate_map = {};

          const squares_values_map = this._get_square_vals_map(board); // Start by assigning every digit as a candidate to every square


          for (const square of this.SQUARES) {
            candidate_map[square] = SudokuCore.DIGITS;
          } // For each non-blank square, assign its value in the candidate map and
          // propagate.


          for (const square in squares_values_map) {
            // No need for hasOwnProperty check if _get_square_vals_map creates a clean object
            const val = squares_values_map[square];

            if (this._in(val, SudokuCore.DIGITS)) {
              // Pass a copy? No, original modifies in place.
              // _assign returns false if contradiction occurs
              const assignmentResult = this._assign(candidate_map, square, val); // Fail if we can't assign val to square


              if (!assignmentResult) {
                return false;
              } // No need to reassign candidate_map = assignmentResult as it's modified in place

            }
          }

          return candidate_map;
        }

        _search(candidates, reverse = false) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES) {
            console.error("_search called before initialization.");
            return false;
          } // Return if error in previous iteration


          if (!candidates) {
            return false;
          } // If only one candidate for every square, we've a solved puzzle!
          // Return the candidates map.


          let max_nr_candidates = 0; // let max_candidates_square: string | null = null; // Not actually used

          let isSolved = true;

          for (const square of this.SQUARES) {
            const nr_candidates = candidates[square].length;

            if (nr_candidates > max_nr_candidates) {
              max_nr_candidates = nr_candidates; // max_candidates_square = square; // Not used
            }

            if (nr_candidates !== 1) {
              isSolved = false; // Optimization: can break early if only checking if solved
              // break; // Keep iterating if we need the min candidates square later
            }
          }

          if (isSolved) {
            console.log("Solved!");
            return candidates;
          } // Choose the blank square with the fewest possibilities > 1


          let min_nr_candidates = 10; // More than max possible (9)

          let min_candidates_square = null;

          for (const square of this.SQUARES) {
            const nr_candidates = candidates[square].length;

            if (nr_candidates < min_nr_candidates && nr_candidates > 1) {
              min_nr_candidates = nr_candidates;
              min_candidates_square = square;
            }
          } // If no square found with > 1 candidates (contradicts isSolved check, but safety)
          // Or if somehow min_candidates_square remained null


          if (min_candidates_square === null) {
            // This case implies the board is either solved or invalid (e.g., a square has 0 candidates)
            // If it was solved, we would have returned earlier.
            // If invalid, the propagation should have returned false earlier.
            // This path indicates a potential logic issue or an already invalid state.
            return false;
          } // Recursively search through each of the candidates of the square
          // starting with the one with fewest candidates.


          const min_candidates = candidates[min_candidates_square]; // Safe due to check above

          const candidatesToTry = reverse ? min_candidates.split('').reverse() : min_candidates.split('');

          for (const val of candidatesToTry) {
            // Need a deep copy for backtracking
            // JSON parse/stringify is a common way, but be mindful of limitations (functions, undefined, etc.)
            // For this data structure (strings in object), it's safe.
            const candidates_copy = JSON.parse(JSON.stringify(candidates));

            const assignmentResult = this._assign(candidates_copy, min_candidates_square, val);

            const candidates_next = this._search(assignmentResult, reverse); // Pass result of _assign


            if (candidates_next) {
              return candidates_next; // Found solution
            }
          } // If we get through all combinations of the square with the fewest
          // candidates without finding an answer, there isn't one. Return false.


          return false;
        }

        _assign(candidates, square, val) {
          // Eliminate all values, *except* for `val`, from `candidates` at
          // `square` (candidates[square]), and propagate. Return the candidates map
          // when finished. If a contradiciton is found, return false.
          // WARNING: This modifies the contents of `candidates` directly.
          // Grab a list of candidates without 'val'
          const other_vals = candidates[square].replace(val, ""); // Loop through all other values and eliminate them from the candidates
          // at the current square, and propagate. If at any point we get a
          // contradiction, return false.

          for (const other_val of other_vals) {
            // _eliminate modifies candidates directly and returns false on contradiction
            const eliminateResult = this._eliminate(candidates, square, other_val);

            if (!eliminateResult) {
              //console.log("Contradiction found by _eliminate.");
              return false;
            } // No need to reassign candidates = eliminateResult

          } // If all eliminations succeeded, return the modified map


          return candidates;
        }

        _eliminate(candidates, square, val) {
          // Ensure initialization for map access
          if (!this.SQUARE_PEERS_MAP || !this.SQUARE_UNITS_MAP) {
            console.error("_eliminate called before initialization.");
            return false;
          } // Eliminate `val` from `candidates` at `square`, (candidates[square]),
          // and propagate when values or places <= 2. Return updated candidates,
          // unless a contradiction is detected, in which case, return false.
          // WARNING: This modifies the contents of `candidates` directly.
          // If `val` has already been eliminated from candidates[square], return early.


          if (!this._in(val, candidates[square])) {
            return candidates; // Already eliminated, success
          } // Remove `val` from candidates[square]


          candidates[square] = candidates[square].replace(val, ''); // A. Contradiction Check 1: If the square has no candidates left after elimination.

          const nr_candidates = candidates[square].length;

          if (nr_candidates === 0) {
            return false; // Contradiction: square has no possible values
          } // B. Propagation 1: If the square is reduced to a single candidate,
          //    eliminate that candidate from its peers.


          if (nr_candidates === 1) {
            const target_val = candidates[square]; // The single remaining candidate

            const peers = this.SQUARE_PEERS_MAP[square]; // Peers guaranteed by initialization check

            if (!peers) return false; // Safety check

            for (const peer of peers) {
              const eliminateResult = this._eliminate(candidates, peer, target_val);

              if (!eliminateResult) {
                return false; // Contradiction during peer elimination
              }
            }
          } // C. Propagation 2: If a unit is reduced to only one possible place for `val`,
          //    then assign `val` to that place.


          const units = this.SQUARE_UNITS_MAP[square]; // Units guaranteed by initialization check

          if (!units) return false; // Safety check

          for (const unit of units) {
            const val_places = [];

            for (const unit_square of unit) {
              if (this._in(val, candidates[unit_square])) {
                val_places.push(unit_square);
              }
            } // C.1 Contradiction Check 2: If there's no place left for `val` in this unit.


            if (val_places.length === 0) {
              return false; // Contradiction: 'val' cannot be placed in this unit
            } // C.2 Assignment: If there's exactly one place left for `val` in this unit.


            if (val_places.length === 1) {
              const target_square = val_places[0]; // Assign `val` to `target_square` (which involves eliminating other values)
              // Use _assign which handles the propagation.

              const assignResult = this._assign(candidates, target_square, val);

              if (!assignResult) {
                return false; // Contradiction during assignment
              }
            }
          } // If no contradictions were found during elimination and propagation, return the modified map.


          return candidates;
        } // Square relationships
        // -------------------------------------------------------------------------
        // Squares, and their relationships with values, units, and peers.


        _get_square_vals_map(board) {
          // Ensure SQUARES is initialized
          if (!this.SQUARES) {
            throw new Error("SudokuCore not initialized. Call initialize() first.");
          }
          /* Return a map of squares -> values */


          const squares_vals_map = {}; // Make sure `board` is a string of length 81

          if (board.length !== this.NR_SQUARES) {
            throw new Error("Board/squares length mismatch.");
          }

          for (let i = 0; i < this.SQUARES.length; ++i) {
            squares_vals_map[this.SQUARES[i]] = board[i];
          }

          return squares_vals_map;
        }

        _get_square_units_map(squares, units) {
          /* Return a map of `squares` and their associated units (row, col, box) */
          const square_unit_map = {}; // For every square...

          for (const cur_square of squares) {
            // Maintain a list of the current square's units
            const cur_square_units = []; // Look through the units, and see if the current square is in it,
            // and if so, add it to the list of of the square's units.

            for (const cur_unit of units) {
              if (cur_unit.includes(cur_square)) {
                // Use includes for arrays
                cur_square_units.push(cur_unit);
              }
            } // Save the current square and its units to the map


            square_unit_map[cur_square] = cur_square_units;
          }

          return square_unit_map;
        }

        _get_square_peers_map(squares, units_map) {
          /* Return a map of `squares` and their associated peers, i.e., a set of
          other squares in the square's unit. */
          const square_peers_map = {}; // For every square...

          for (const cur_square of squares) {
            const cur_square_units = units_map[cur_square];
            if (!cur_square_units) continue; // Should not happen if units_map is correct
            // Maintain list of the current square's peers

            const cur_square_peers = [];
            const peer_set = new Set(); // Use Set for efficient uniqueness check
            // Look through the current square's units map...

            for (const cur_unit of cur_square_units) {
              for (const cur_unit_square of cur_unit) {
                if (cur_unit_square !== cur_square) {
                  peer_set.add(cur_unit_square);
                }
              }
            } // Convert Set back to array


            square_peers_map[cur_square] = Array.from(peer_set);
          }

          return square_peers_map;
        }

        _get_all_units(rows, cols) {
          /* Return a list of all units (rows, cols, boxes) */
          const units = []; // Rows

          for (const r of rows) {
            units.push(this._cross(r, cols));
          } // Columns


          for (const c of cols) {
            units.push(this._cross(rows, c));
          } // Boxes


          const row_squares = ["ABC", "DEF", "GHI"];
          const col_squares = ["123", "456", "789"];

          for (const rs of row_squares) {
            for (const cs of col_squares) {
              units.push(this._cross(rs, cs));
            }
          }

          return units;
        } // Conversions
        // -------------------------------------------------------------------------


        board_string_to_grid(board_string) {
          /* Convert a board string to a two-dimensional array */
          const rows = [];
          let cur_row = [];

          for (let i = 0; i < board_string.length; i++) {
            cur_row.push(board_string[i]);

            if (i % 9 === 8) {
              rows.push(cur_row);
              cur_row = [];
            }
          }

          return rows;
        }

        board_grid_to_string(board_grid) {
          /* Convert a board grid to a string */
          let board_string = "";

          for (let r = 0; r < 9; ++r) {
            for (let c = 0; c < 9; ++c) {
              // Basic safety check for grid structure
              if (board_grid[r] && board_grid[r][c] !== undefined) {
                board_string += board_grid[r][c];
              } else {
                // Handle potentially malformed grid - append blank or throw error
                console.warn(`Malformed grid at row ${r}, col ${c}. Appending blank.`);
                board_string += this.BLANK_CHAR; // Or: throw new Error(`Malformed grid at row ${r}, col ${c}`);
              }
            }
          } // Add length check


          if (board_string.length !== this.NR_SQUARES) {
            console.error(`Resulting string length ${board_string.length} does not match expected ${this.NR_SQUARES}`); // Potentially throw error or return truncated/padded string
          }

          return board_string;
        } // Utility
        // -------------------------------------------------------------------------


        print_board(board) {
          /* Print a sudoku `board` to the console. */
          // Assure a valid board
          const report = this.validate_board(board);

          if (report !== true) {
            throw new Error(report);
          }

          const V_PADDING = " "; // Insert after each square

          const H_PADDING = '\n'; // Insert after each row

          const V_BOX_PADDING = "  "; // Box vertical padding

          const H_BOX_PADDING = '\n'; // Box horizontal padding

          let display_string = "";

          for (let i = 0; i < board.length; i++) {
            const square = board[i]; // Add the square and some padding

            display_string += square + V_PADDING; // Vertical edge of a box (after 3rd, 6th square in a row)
            // Indices 2, 5, 11, 14, etc. -> (i % 9) === 2 || (i % 9) === 5

            if (i % 9 === 2 || i % 9 === 5) {
              display_string += V_BOX_PADDING;
            } // End of a line (after 9th square)


            if (i % 9 === 8) {
              display_string += H_PADDING; // Horizontal edge of a box (after 3rd, 6th row)
              // Indices 26, 53 -> i === 26 || i === 53

              if (i === 26 || i === 53) {
                display_string += H_BOX_PADDING;
              }
            }
          }

          console.log(display_string);
        }

        validate_board(board) {
          /* Return if the given `board` is valid or not. If it's valid, return
          true. If it's not, return a string of the reason why it's not. */
          // Check for empty/null/undefined board
          if (!board) {
            return "Empty board";
          } // Invalid board length


          if (board.length !== this.NR_SQUARES) {
            return "Invalid board size. Board must be exactly " + this.NR_SQUARES + " squares.";
          } // Check for invalid characters


          for (let i = 0; i < board.length; i++) {
            const char = board[i];

            if (!this._in(char, SudokuCore.DIGITS) && char !== this.BLANK_CHAR) {
              return "Invalid board character encountered at index " + i + ": " + char;
            }
          } // Otherwise, we're good. Return true.


          return true;
        } // Helper method adjusted for string inputs as used in this class


        _cross(a, b) {
          /* Cross product of all elements in `a` and `b`, e.g.,
          _cross("ABC", "123") ->
          ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
          */
          const result = [];

          for (const charA of a) {
            for (const charB of b) {
              result.push(charA + charB);
            }
          }

          return result;
        }

        _in(v, seq) {
          /* Return if a value `v` is in sequence `seq`. Overloaded for string and array. */
          return seq.indexOf(v) !== -1;
        } // Note: first_true is not used in the provided code, but kept for completeness


        first_true(seq) {
          /* Return the first element in `seq` that is true. If no element is
          true, return false.
          */
          for (const item of seq) {
            if (item) {
              return item;
            }
          }

          return false;
        } // Using Fisher-Yates (Knuth) shuffle algorithm for better randomness and simplicity


        _shuffle(seq) {
          /* Return a shuffled version of `seq` */
          const shuffled = [...seq]; // Create a copy

          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
          }

          return shuffled;
        }

        _rand_range(max, min = 0) {
          /* Get a random integer in the range of `min` (inclusive) to `max` (exclusive).
          */
          if (max <= min) {
            // Avoid issues with range, return min or throw error
            // console.warn(`_rand_range called with max (${max}) <= min (${min}). Returning min.`);
            if (max < min) throw new Error(`_rand_range: max (${max}) cannot be less than min (${min})`);
            return min; // If max === min, the only possible value is min, but range is exclusive of max.
            // Throwing might be safer depending on expected usage.
            // Let's throw if max <= min to indicate invalid input for exclusive range.
            // throw new Error(`_rand_range: max (${max}) must be greater than min (${min})`);
          }

          return Math.floor(Math.random() * (max - min)) + min;
        } // Using Set for efficient duplicate removal


        _strip_dups(seq) {
          /* Strip duplicate values from `seq` */
          return Array.from(new Set(seq));
        }

        _force_range(nr, max, min = 0) {
          /* Force `nr` to be within the range from `min` (inclusive) to `max` (exclusive).
             If `nr` is undefined/null, treat it as 0.
          */
          const num = nr === undefined || nr === null ? 0 : nr;

          if (num < min) {
            return min;
          } // The original comment implied max inclusive, but standard ranges are often exclusive.
          // Assuming max is exclusive based on typical range functions.


          if (num >= max) {
            return max - 1; // Return the highest valid value within the exclusive range
          }

          return num;
        }

      }); // --- END OF FILE sudoku_core.ts ---


      SudokuCore.DIGITS = "123456789";
      SudokuCore.ROWS = "ABCDEFGHI";
      // Number of squares
      // Define difficulties by how many squares are given to the player in a new
      // puzzle.
      SudokuCore.DIFFICULTY = {
        "easy": 62,
        "medium": 53,
        "hard": 44,
        "very-hard": 35,
        "insane": 26,
        "inhuman": 17
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5c82a564d6ee5b206c8fff550040e9fda23fc956.js.map