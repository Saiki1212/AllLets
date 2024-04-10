import TraversingCode from './DSA/Array/Traversing';
import LinearSearch from './DSA/Array/Searching'
import BinarySearch from './DSA/Array/BinarySearch';
import ArrayInsertion from './DSA/Array/ArrayInsertion'
import ArrayDeletion from './DSA/Array/ArrayDeletion';
import ArrayBubbleSort from './DSA/Array/ArrayBubbleSort'
import ArrayInsertionSort from './DSA/Array/ArrayInsertionSort';
import ArraySelectionSort from './DSA/Array/ArraySelectionSort';
import ArrayCountSort from './DSA/Array/ArrayCountSort';
import ArrayMergeSort from './DSA/Array/ArrayMergeSort';
import ArrayQuickSort from './DSA/Array/ArrayQuickSort'
import Variables from './DSA/Java/Variables';
import Ifelse from './DSA/Java/IfElse';
import SwitchStatement from './DSA/Java/SwitchStatement';
import WhileLoop from './DSA/Java/WhileLoop'
import ForLoop from './DSA/Java/ForLoop';

const sample = [
    {
        name: 'Data Structures and Algorithms',
        courseImage: require('./assets/dsa.jpg'),
        courseVideo: require('./assets/Videos/DSABigONotaion.mp4'),
        courseInfo: 'Data structures are fundamental components of computer science and programming that allow you to organize and store data efficiently.',
        courseCompleteInfo: `Data Structures:
        Data structures are fundamental components in computer science and programming. They serve as the foundation for organizing and managing data efficiently within a computer's memory. These structures define how data is stored, accessed, and manipulated. Examples of data structures include arrays, linked lists, trees, graphs, stacks, and queues.Data structures offer various benefits. They provide efficient methods for performing common operations such as searching, sorting, and inserting data. Selecting the appropriate data structure for a specific problem can significantly impact the efficiency and effectiveness of algorithms.
        
Algorithms:
        Algorithms are step-by-step instructions for solving specific problems or performing tasks. They describe the precise sequence of actions required to manipulate data stored within data structures. Algorithms can be represented in various forms, such as pseudocode, flowcharts, or programming languages.
        Examples of algorithms encompass sorting algorithms like quicksort and mergesort, searching algorithms like binary search, and graph traversal algorithms like depth-first search and breadth-first search. Efficient algorithms aim to optimize resource usage, such as time and memory, to solve problems swiftly and effectively.
        
Usefulness:
        Understanding data structures and algorithms is vital for anyone working in the field of computer science or software development. These concepts serve as the building blocks for solving a diverse array of computational challenges. By leveraging appropriate data structures and well-designed algorithms, developers can create efficient and scalable software solutions, which are crucial for modern computing applications. Mastery of these concepts is essential for optimizing software performance and solving complex problems efficiently.`,
        courseFunctions: [
            {
                name: 'Array',
                courseImage: require('./assets/dsa.jpg'),
                courseInfo: 'An array is a collection of items of same data type stored at contiguous memory locations. ',
                courseCompleteInfo: `
                For simplicity, we can think of an array as a flight of stairs where on each step is placed a value (let’s say one of your friends). Here, you can identify the location of any of your friends by simply knowing the count of the step they are on. 
                
                This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array). The base value is index 0 and the difference between the two indexes is the offset.
                `,
                courseFunctions: [
                    {
                        name: 'Traversing',
                        courseInfo: 'Traversing a Data Structure means to visit the element stored in it. It visits data in a systematic manner. This can be done with any type of DS.',
                        courseImage: require('./assets/dsa.jpg'),
                        courseCompleteInfo: 'Traversing: Traversing a Data Structure means to visit the element stored in it. It visits data in a systematic manner. This can be done with any type of DS. ',
                        code: TraversingCode,
                    },
                    {
                        name: 'Searching',
                        courseImage: require('./assets/dsa.jpg'),
                        courseInfo: 'Searching Algorithms are designed to check for an element or retrieve an element from any data structure where it is stored.',
                        courseCompleteInfo: `
Based on the type of search operation, these algorithms are generally classified into two categories:

1. Sequential Search: In this, the list or array is traversed sequentially and every element is checked. For example: Linear Search.

2. Interval Search: These algorithms are specifically designed for searching in sorted data-structures. These type of searching algorithms are much more efficient than Linear Search as they repeatedly target the center of the search structure and divide the search space in half. For Example: Binary Search.`,
                        courseFunctions: [
                            {
                                name: 'Linear Search',
                                courseImage: require('./assets/dsa.jpg'),
                                courseVideo: require('./assets/Videos/LinearSearchArray.mp4'),
                                courseLink: [
                                    'https://www.hackerrank.com/contests/17cs1102/challenges/1-a-linear-search',
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS08',
                                ],
                                courseInfo: 'Linear Search is defined as a sequential search algorithm that starts at one end and goes through each element of a list until the desired element is found, otherwise the search continues till the end of the data set.',
                                courseCompleteInfo: `In Linear Search Algorithm, 

-> Every element is considered as a potential match for the key and checked for the same.

-> If any element is found equal to the key, the search is successful and the index of that element is returned.

-> If no element is found equal to the key, the search yields “No match found”.`,
                                code: LinearSearch,
                            },
                            {
                                name: 'Binary Search',
                                courseImage: require('./assets/dsa.jpg'),
                                courseVideo: require('./assets/Videos/BinarySearchArray.mp4'),
                                courseLink: [
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS09',
                                    'https://leetcode.com/problems/binary-search/',
                                    'https://leetcode.com/problems/search-insert-position/description/',
                                    'https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/description/',
                                ],
                                courseInfo: 'Binary Search is defined as a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N). ',
                                courseCompleteInfo: `In this algorithm, 

-> Divide the search space into two halves by finding the middle index “mid”. 

-> Compare the middle element of the search space with the key. 

-> If the key is found at middle element, the process is terminated.

-> If the key is not found at middle element, choose which half will be used as the next search space.

-> If the key is smaller than the middle element, then the left side is used for next search.

-> If the key is larger than the middle element, then the right side is used for next search.

-> This process is continued until the key is found or the total search space is exhausted.`,
                                code: BinarySearch,
                            },
                        ],
                    }, 
                    {
                        name: 'Insertion',
                        courseImage: require('./assets/dsa.jpg'),
                        courseLink: [
                            'https://practice.geeksforgeeks.org/problems/adding-array-element4756/1'
                        ],
                        courseInfo: "In the insertion operation, we are adding one or more elements to the array. Based on the requirement, a new element can be added at the beginning, end, or any given index of array. This is done using input statements of the programming languages.",
                        courseCompleteInfo: `
1. Specify the Array: Identify the array in which you want to insert the element(s). You need to know the array's name or reference.

2. Determine the Position: Decide where in the array you want to insert the new element. This position is usually specified by an index or location within the array. Indexing often starts at 0 for the first element.

3. Make Space: If the array is full or doesn't have enough room for the new element, you may need to allocate more memory or expand the array (if it's a dynamic array). In a static array, this can be more complex as you may need to create a new larger array and copy the existing elements to it.

4. Shift Elements: If the insertion point is not at the end of the array, you'll need to shift the existing elements to create space for the new element. This usually involves a loop that moves elements to the right from the insertion point.

5. Insert the New Element: Place the new element in the desired position in the array. The element can be assigned to the index you determined in step 2.`,
                        code: ArrayInsertion,
                    },
                    {
                        name: 'Deletion',
                        courseImage: require('./assets/dsa.jpg'),
                        courseLink: [
                            'https://leetcode.com/problems/remove-element/description/'
                        ],
                        courseInfo: 'Deleting an element from an array in any programming language involves removing a specific element from the array and then shifting the remaining elements to fill the gap.',
                        courseCompleteInfo: `
1) Initialize the Array: First, you have an array named arr with the elements you want to modify. In this example, we have an array with elements [1, 2, 3, 4, 5].

2) Choose the Index: Determine the index of the element you want to delete. In this example, indexToDelete is set to 2, which corresponds to the third element in the array (3).

3) Check Index Validity: It's important to check if the specified index is valid, meaning it falls within the bounds of the array. In this case, indexToDelete is checked to ensure it's not negative and not greater than or equal to the array's length.

4) Perform In-Place Deletion:
    -- Iterate from indexToDelete to arr.length - 1 in a loop. This loop starts from the index you want to delete and goes up to the second-to-last element in the array.
    -- Inside the loop, each element is overwritten by the next element (the element to its right). This effectively shifts all elements one position to the left, overwriting the element at indexToDelete.
    -- After this loop, the element at indexToDelete is replaced by the element that was to its right.

5) Resize the Array: After overwriting the element to be deleted, the array is resized to remove the last element. This is necessary because, during the loop, the last element in the array is duplicated into the second-to-last position. By resizing the array using Arrays.copyOf, you eliminate the duplicate element.

6) Display the Modified Array: Finally, you can display the modified array to see the result of the deletion. In this example, it would show [1, 2, 4, 5], with the element 3 removed from the array.`,
                        code: ArrayDeletion,
                    }, 
                    {
                        name: 'Sorting',
                        courseImage: require('./assets/dsa.jpg'),
                        courseInfo: 'Sorting involves reordering a set of items based on a defined criterion or comparison function.',
                        courseCompleteInfo: `
1. Order Arrangement: Sorting involves reordering a set of items based on a defined criterion or comparison function. The criterion can be numerical (e.g., sorting numbers), lexicographical (e.g., sorting strings), or based on custom rules defined by the user.

2. Comparison: Sorting requires comparing elements in the collection to determine their relative order. Elements are typically compared pairwise, and based on the comparison result, they are rearranged.

3. Stability: Some sorting algorithms maintain the relative order of elements with equal keys (values). This property is called stability. A stable sorting algorithm ensures that when two elements have equal keys, their original order is preserved in the sorted output.

4. In-Place vs. Out-of-Place: Sorting can be performed in-place, meaning it rearranges the elements within the original data structure without requiring additional memory. Alternatively, it can be out-of-place, creating a new sorted copy of the data while leaving the original data unchanged.

5. Performance: Different sorting algorithms have different time and space complexities, making them more or less suitable for specific use cases. The performance of a sorting algorithm depends on factors like the size of the dataset, the initial order of the data, and available memory.

6. Common Sorting Algorithms: There are several well-known sorting algorithms, each with its own characteristics. Some common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Radix Sort, as described in a previous response.

7. Applications: Sorting is used in various applications, including searching algorithms, database queries, data analysis, and organizing data for efficient retrieval and presentation. For example, sorted data allows for quick searching using binary search and enhances the user experience when working with ordered lists.

`,
                        courseFunctions: [
                            {
                                name: 'Bubble Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseLink: [
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS04',
                                    'https://practice.geeksforgeeks.org/problems/bubble-sort/1'
                                ],
                                courseVideo: require('./assets/Videos/BubbleSortArray.mp4'),
                                courseInfo: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.',
                                courseCompleteInfo: `
Algorithm:

1) Start at the beginning of the list.

2) Compare the first two elements. If the first element is greater than the second, swap them.

3) Move to the next pair of elements (2nd and 3rd), and continue comparing and swapping if necessary.

4) Continue this process, moving one element at a time to the right, until you reach the end of the list. This first pass will move the largest element to the end of the list.

5) Repeat steps 1-4 for the entire list, but on each pass, one less element needs to be compared, as the largest element is already in its correct position.

6) Continue these passes until no more swaps are needed. This indicates that the list is fully sorted.

Key Points:

--> Bubble Sort is a simple and inefficient sorting algorithm, mainly used for educational purposes and small datasets.
--> It has a time complexity of O(n^2) in the worst and average cases, where 'n' is the number of elements in the list.
--> In the best-case scenario (when the list is already sorted), Bubble Sort has a time complexity of O(n).
--> Bubble Sort is an in-place sorting algorithm, meaning it does not require additional memory space for sorting.`,
                                code: ArrayBubbleSort,
                            },
                            {
                                name: 'Insertion Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseLink: [
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS03',
                                    'https://www.hackerrank.com/challenges/insertionsort1/problem'
                                ],
                                courseVideo: require('./assets/Videos/InsertionSortArray.mp4'),
                                courseInfo: "Insertion sort is a simple and efficient comparison-based sorting algorithm that works well for small data sets and is often used in practice when the list is nearly sorted or when the list is small. It's an in-place sorting algorithm, which means it doesn't require additional memory to sort the elements",
                                courseCompleteInfo: `
1) Initialization: Start with the second element (index 1) of the array. The first element (at index 0) is considered already sorted.

2) Comparison and Insertion: Iterate through the unsorted portion of the array, comparing each element with the elements in the sorted portion of the array, from right to left. Stop when you find an element in the sorted portion that is greater than the element you're currently considering.

3) Insertion: Insert the current element into its correct position within the sorted portion of the array by shifting the larger elements to the right to make room for it. This effectively expands the sorted portion of the array.

4) Repeat: Continue these steps for each remaining unsorted element until the entire array is sorted.

Key Points:

-- Insertion sort is adaptive, which means it performs better on nearly sorted data. When dealing with small data sets or partially sorted data, it can be faster than other sorting algorithms.

-- It is an in-place sorting algorithm, meaning it doesn't require additional memory for sorting.

-- In the worst case, where the array is in reverse order, insertion sort has a time complexity of O(n^2). However, in the best case, when the array is already sorted, it has a time complexity of O(n).

-- Insertion sort is stable, meaning it preserves the relative order of equal elements.

-- While insertion sort might not be the most efficient sorting algorithm for large datasets, it's straightforward to implement and can be a good choice for small lists or as part of more complex sorting algorithms like Timsort.`,
                                code: ArrayInsertionSort,
                            },
                            {
                                name: 'Selection Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseLink: [
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS05',
                                    'https://practice.geeksforgeeks.org/problems/selection-sort/1'
                                ],
                                courseVideo: require('./assets/Videos/SelectionSortArray.mp4'),
                                courseInfo: 'Selection Sort is a straightforward and intuitive comparison-based sorting algorithm. It works by dividing the input into two sublists: the left sublist of elements already sorted and the right sublist of elements to be sorted. Initially, the left sublist is empty, and the right sublist contains all the elements. The algorithm repeatedly selects the minimum (or maximum) element from the unsorted right sublist and moves it to the end of the sorted left sublist. This process continues until the entire list is sorted.',
                                courseCompleteInfo: `
Algorithm Steps:

1. Initialization: The algorithm begins with an empty sorted sublist and the entire unsorted sublist containing all the elements.

2. Find the Minimum Element: It scans through the unsorted sublist to find the minimum element. This involves comparing each element with the current minimum found so far and updating the minimum if a smaller element is found.

3. Swap with the First Element in the Unsorted Sublist: Once the minimum element is determined, it is swapped with the first element in the unsorted sublist. This effectively moves the minimum element to the end of the sorted sublist and expands the sorted sublist by one element.

4. Repeat: Steps 2 and 3 are repeated for each element in the unsorted sublist, which shortens the unsorted sublist and expands the sorted sublist with each iteration.

5. Termination: The algorithm continues this process until the entire list is sorted. The unsorted sublist becomes empty, and the sorted sublist contains all the elements in the correct order.

Key Characteristics:

-- In-Place Sorting: Selection Sort operates in-place, meaning it doesn't require additional memory to sort the list. It rearranges elements within the original array.

-- Unstable Sorting Algorithm: Selection Sort is unstable, meaning that the relative order of elements with equal keys (values) may change during the sorting process.

-- Time Complexity: Selection Sort has a time complexity of O(n^2) in all cases. It performs a quadratic number of comparisons and swaps.

-- Space Complexity: The space complexity of Selection Sort is O(1) since it doesn't require additional memory for data structures like auxiliary arrays or linked lists.

-- Use Cases: Selection Sort is not the most efficient sorting algorithm, but it is simple and suitable for small datasets or as a building block within more complex algorithms. Its simplicity makes it a good educational example of sorting.

-- Performance: Selection Sort is generally not recommended for sorting large datasets due to its poor performance compared to more efficient sorting algorithms like Quick Sort or Merge Sort. However, it can be useful when the dataset is small or almost sorted.
`,
                                code: ArraySelectionSort,
                            },
                            {
                                name: 'Count Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseVideo: require('./assets/Videos/CountSortArray.mp4'),
                                courseLink: [
                                    'https://leetcode.com/problems/array-partition/description/',
                                    'https://leetcode.com/problems/height-checker/description/'
                                ],
                                courseInfo: 'Counting Sort is a non-comparative sorting algorithm that works well when the range of input values is relatively small compared to the number of elements to be sorted. It is an efficient algorithm for sorting integers or objects with integer keys and works by counting the number of occurrences of each distinct element in the input data.',
                                courseCompleteInfo: `
Algorithm Description:

1) Determine the Range: The first step in Counting Sort is to determine the range of input values or keys. You need to know the minimum and maximum values present in the input array. This range is used to create an auxiliary array, often called the "counting array."

2) Create a Counting Array: Create a counting array, which is an array of size (max - min + 1), where max is the maximum value in the input data, and min is the minimum value. Each element of this counting array is initialized to zero.

3) Count Occurrences: Traverse the input array, and for each element, increment the corresponding index in the counting array. This step essentially counts how many times each distinct element appears in the input array.

4) Calculate Cumulative Counts: Modify the counting array so that each element at index i contains the sum of the elements at indices from 0 to i. This cumulative count indicates the position where elements will appear in the sorted output.

5) Generate the Sorted Array: Create a new array for the sorted output. Starting from the end of the original input array, for each element x, look up its count in the cumulative counting array and place x in the corresponding position in the output array. Decrease the count for x in the cumulative counting array by 1 to handle duplicate elements.

6) Final Sorted Array: The output array is now sorted in ascending order, and you can return it as the result.

Key Points:

--> Counting Sort is stable, meaning it preserves the relative order of elements with equal keys.

--> It has a time complexity of O(n + k), where n is the number of elements to be sorted, and k is the range of input values. When the range k is significantly smaller than n, Counting Sort can be very efficient.

--> Counting Sort is not suitable for sorting data with a large range of values because it requires extra memory for the counting array.

--> It is not a comparison-based sorting algorithm, so it doesn't rely on element comparisons and, therefore, can be faster than comparison-based algorithms like Quick Sort or Merge Sort for certain data distributions.

-->Counting Sort is most effective when you're sorting a large number of items with a limited range of key values, making it a valuable tool in certain specialized sorting scenarios.`,
                                code: ArrayCountSort,
                            },
                            {
                                name: 'Merge Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseLink: [
                                    'https://leetcode.com/problems/sort-an-array/description/',
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS07'
                                ],
                                courseInfo: 'Merge sort is a popular and efficient divide-and-conquer sorting algorithm. It works by repeatedly dividing the unsorted list into smaller sub-lists, sorting those sub-lists, and then merging them back together to create a single, sorted list.',
                                courseCompleteInfo: `
1) Divide: The unsorted list is divided into two approximately equal halves. This division continues recursively until the sub-lists are reduced to a size of one element each, which are inherently sorted.

2) Conquer (Sort): Once the list is divided into single-element sub-lists (base cases), the sorting phase begins. Pairs of adjacent sub-lists are merged together in a sorted manner. The merging process ensures that the elements within each sub-list remain in sorted order.

3) Merge: The merging process combines two sorted sub-lists into a single sorted list. It compares the elements from the two sub-lists and selects the smaller (or larger, depending on the desired order) element to place in the merged list. This process continues until all elements from both sub-lists are included in the merged list.

4) Recursion: Steps 1 through 3 are repeated recursively until all sub-lists have been merged into a single sorted list. The merge sort algorithm is particularly efficient due to this divide-and-conquer approach.

5) Combining Sorted Lists: After all sub-lists have been merged, you are left with one fully sorted list that contains all the elements from the original unsorted list.

Key Features of Merge Sort:

--> Stability: Merge sort is a stable sorting algorithm, meaning that the relative order of equal elements is preserved.

--> Predictable Performance: Merge sort has a consistent and predictable performance with a time complexity of O(n log n) in all cases. This makes it suitable for sorting large datasets.

--> Out-of-Place Sorting: Merge sort is an out-of-place sorting algorithm. It does not modify the original list but creates a new sorted list. The memory requirements for merge sort are higher than some in-place sorting algorithms.

--> Efficiency: Merge sort is particularly efficient for sorting large datasets or when the data is stored in external storage, such as hard drives, where minimizing the number of data movements is important.

While merge sort is efficient and reliable, it does require additional memory for the merging step. However, this extra memory usage is often considered a reasonable trade-off for its consistent and excellent time complexity, making it a popular choice for various sorting tasks.`,
                                code: ArrayMergeSort,
                            },
                            {
                                name: 'Quick Sort',
                                courseImage: require('./assets/dsa.jpg'),
                                courseVideo: require('./assets/Videos/QuickSortArray.mp4'),
                                courseLink: [
                                    'https://www.codechef.com/DSCA2019/problems/NSECDS06',
                                    'https://practice.geeksforgeeks.org/problems/quick-sort/1'
                                ],
                                courseInfo: 'Quick Sort is a widely used and efficient comparison-based sorting algorithm that employs a divide-and-conquer strategy to sort an array or list of elements. It was developed by Tony Hoare in 1960. Quick Sort is known for its high performance and is often used as a standard benchmark for comparison with other sorting algorithms.',
                                courseCompleteInfo: `
1. Divide and Conquer: Quick Sort follows the divide-and-conquer approach. The main idea is to choose a "pivot" element from the array and partition the elements into two sub-arrays: one containing elements less than the pivot, and the other containing elements greater than the pivot.

2. Pivot Selection: The choice of the pivot is crucial to the performance of Quick Sort. Common pivot selection methods include selecting the first element, the last element, the middle element, or using a random element. Some advanced variations use techniques like the "median of three" to optimize pivot selection.

3. Partitioning: After selecting the pivot, the elements in the array are rearranged so that elements less than the pivot are to the left, and elements greater than the pivot are to the right. The pivot itself is now in its correct sorted position.

4. Recursive Sorting: Once the partitioning is complete, Quick Sort is applied recursively to the two sub-arrays, one on the left of the pivot and the other on the right. This process continues until the sub-arrays become trivially small (e.g., they have only one element), at which point they are considered sorted.

5. In-Place Sorting: Quick Sort is an in-place sorting algorithm, which means that it sorts the elements within the original array without requiring additional memory for new data structures. This is achieved by swapping elements within the array.

6. Efficient Average Case: Quick Sort has an average-case time complexity of O(n log n), making it highly efficient for large datasets. On average, it performs fewer comparisons than some other sorting algorithms, which contributes to its speed.

7. Worst-Case Scenario: The worst-case time complexity of Quick Sort is O(n^2), which occurs when the pivot selection consistently results in highly unbalanced partitions (e.g., always selecting the smallest or largest element as the pivot). However, this worst-case scenario is rare in practice.

8. Randomization: To mitigate the worst-case scenario, randomized Quick Sort selects the pivot element randomly. With a random pivot selection, the worst-case scenario is unlikely to occur.

9. Partitioning Methods: There are several partitioning strategies within Quick Sort, including the Lomuto partition scheme and the Hoare partition scheme. The Hoare partition scheme is generally preferred for its efficiency.

Quick Sort is a versatile sorting algorithm that is widely used due to its speed and adaptability to different data distributions. It's especially effective when dealing with large datasets, and its performance is enhanced when implemented with randomized pivot selection.`,
                                code: ArrayQuickSort,
                            },
                        ],
                    }, 
                ],
            },
            {
                name: 'Linked List',
                courseImage: require('./assets/dsa.jpg'),
                courseInfo: 'A linked list is the most sought-after data structure when it comes to handling dynamic data elements. A linked list consists of a data element known as a node. And each node consists of two fields: one field has data, and in the second field, the node has an address that keeps a reference to the next node.',
                courseCompleteInfo: `Linked List is a linear data structure, in which elements are not stored at a contiguous location, rather they are linked using pointers. Linked List forms a series of connected nodes, where each node stores the data and the address of the next node.
                
--> Node Structure:  A node in a linked list typically consists of two components:

    --> Data: It holds the actual value or data associated with the node.
    --> Next Pointer: It stores the memory address (reference) of the next node in the sequence.
    --> Head and Tail: The linked list is accessed through the head node, which points to the first node in the list. The last node in the list points to NULL or nullptr, indicating the end of the list. This node is known as the tail node.

Why linked list data structure needed?
Here are a few advantages of a linked list that is listed below, it will help you understand why it is necessary to know.

1) Dynamic Data structure:  The size of memory can be allocated or de-allocated at run time based on the operation insertion or deletion.

2) Ease of Insertion/Deletion:  The insertion and deletion of elements are simpler than arrays since no elements need to be shifted after insertion and deletion, Just the address needed to be updated.

3) Efficient Memory Utilization:  As we know Linked List is a dynamic data structure the size increases or decreases as per the requirement so this avoids the wastage of memory. 

4) Implementation:  Various advanced data structures can be implemented using a linked list like a stack, queue, graph, hash maps, etc.`,
            },
            
        ],
    },
    {
        name: 'Java',
        courseImage: require('./assets/java.jpg'),
        courseVideo: require('./assets/Videos/DSABigONotaion.mp4'),
        courseInfo: 'Java is a programming language and computing platform first released by Sun Microsystems in 1995. It has evolved from humble beginnings to power a large share of today’s digital world, by providing the reliable platform upon which many services and applications are built. New, innovative products and digital services designed for the future continue to rely on Java, as well.',
        courseCompleteInfo: `Java is a widely-used programming language for coding web applications. It has been a popular choice among developers for over two decades, with millions of Java applications in use today. Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.

What is Java programming language used for? 

Because Java is a free-to-use and a versatile language, it builds localized and distributed software. Some common uses of Java include:

1.     Game Development
Many popular mobile, computer, and video games are built in Java. Even modern games that integrate advanced technology like machine learning or virtual reality are built with Java technology.

2.     Cloud computing
Java is often referred to as WORA – Write Once and Run Anywhere, making it perfect for decentralized cloud-based applications. Cloud providers choose Java language to run programs on a wide range of underlying platforms.

3.     Big Data
Java is used for data processing engines that can work with complex data sets and massive amounts of real-time data.

4.     Artificial Intelligence
Java is a powerhouse of machine learning libraries. Its stability and speed make it perfect for artificial intelligence application development like natural language processing and deep learning.

5.     Internet of Things
Java has been used to program sensors and hardware in edge devices that can connect independently to the internet.

Java is popular because it has been designed for ease of use. Some reasons developers continue to choose Java over other programming languages include:

High quality learning resources
Java has been around for a long time, so many learning resources are available for new programmers. Detailed documentation, comprehensive books, and courses support developers through the learning curve. In addition, beginners can start writing code in Core Java before moving to Advanced Java.

Inbuilt functions and libraries
When using Java, developers don’t need to write every new function from scratch. Instead, Java provides a rich ecosystem of in-built functions and libraries to develop a range of applications. 

Active community support
Java has many active users and a community that can support developers when they face coding challenges. The Java platform software is also maintained and updated regularly.

High-quality development tools
Java offers various tools to support automated editing, debugging, testing, deployment, and change management. These tools make Java programming time and cost-efficient.

Platform Independent
Java code can run on any underlying platform like Windows, Linux, iOS, or Android without rewriting. This makes it especially powerful in today’s environment, where we want to run applications on multiple devices.

Security
Users can download untrusted Java code over a network and run it in a secure environment in which it cannot do any harm. Untrusted code cannot infect the host system with a virus nor can it read or write files from the hard drive. The security levels and restrictions in Java are also highly configurable.`,
        courseFunctions: [
            {
                name: 'Variables and data types',
                courseImage: require('./assets/java.jpg'),
                code: Variables,
                courseInfo: 'Variables are containers for storing data values.',
                courseCompleteInfo: `
In Java, there are different types of variables, for example:

String - stores text, such as "Hello". String values are surrounded by double quotes.

int - stores integers (whole numbers), without decimals, such as 123 or -123.

float - stores floating point numbers, with decimals, such as 19.99 or -19.99.

char - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes.

boolean - stores values with two states: true or false`,
            },    
            {
                name: 'If Else',
                courseImage: require('./assets/java.jpg'),
                code: Ifelse,
                courseInfo: 'You already know that Java supports the usual logical conditions from mathematics:',
                courseCompleteInfo: `
Less than: a < b
Less than or equal to: a <= b
Greater than: a > b
Greater than or equal to: a >= b
Equal to a == b
Not Equal to: a != b

You can use these conditions to perform different actions for different decisions.

Java has the following conditional statements:

Use if to specify a block of code to be executed, if a specified condition is true.

Use else to specify a block of code to be executed, if the same condition is false.

Use else if to specify a new condition to test, if the first condition is false.

Use switch to specify many alternative blocks of code to be executed.
                `,
            },    
            {
                name: 'Switch statement',
                courseImage: require('./assets/java.jpg'),
                code: SwitchStatement,
                courseInfo: 'Instead of writing many if..else statements, you can use the switch statement.',
                courseCompleteInfo: `The switch statement selects one of many code blocks to be executed.
                
This is how it works:

The switch expression is evaluated once.

The value of the expression is compared with the values of each case.

If there is a match, the associated block of code is executed.

The break and default keywords are optional, and will be described later in this chapter`,
            },    
            {
                name: 'While Loop',
                courseImage: require('./assets/java.jpg'),
                code: WhileLoop,
                courseInfo: 'Loops can execute a block of code as long as a specified condition is reached.',
                courseCompleteInfo: `Loops are handy because they save time, reduce errors, and they make code more readable.`,
            },    
            {
                name: 'For Loop',
                courseImage: require('./assets/java.jpg'),
                code: ForLoop,
                courseInfo: 'When you know exactly how many times you want to loop through a block of code, use the for loop instead of a while loop:',
                courseCompleteInfo: `
for (statement 1; statement 2; statement 3) {
// code block to be executed
}

Statement 1 is executed (one time) before the execution of the code block.

Statement 2 defines the condition for executing the code block.

Statement 3 is executed (every time) after the code block has been executed.

The example below will print the numbers 0 to 4:`,
            },    
        ],
    },
    {
        name: 'C++',
        courseImage: require('./assets/CPP.jpg'),
        courseInfo: 'C++ is an object-oriented programming language which gives a clear structure to programs and allows code to be reused, lowering development costs. C++ is portable and can be used to develop applications that can be adapted to multiple platforms.',
        courseCompleteInfo: `Coming Soon...`,
    },
    {
        name: 'C Language',
        courseImage: require('./assets/C1.jpeg'),
        courseInfo: 'C is a general-purpose programming language created by Dennis Ritchie at the Bell Laboratories in 1972. It is a very popular language, despite being old. The main reason for its popularity is because it is a fundamental language in the field of computer science.',
        courseCompleteInfo: `Coming Soon...`,
    },
    {
        name: 'Python',
        courseImage: require('./assets/python.jpg'),
        courseInfo: 'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.',
        courseCompleteInfo: `Python is an interpreted, interactive, object-oriented programming language. It incorporates modules, exceptions, dynamic typing, very high level dynamic data types, and classes. It supports multiple programming paradigms beyond object-oriented programming, such as procedural and functional programming. Python combines remarkable power with very clear syntax. It has interfaces to many system calls and libraries, as well as to various window systems, and is extensible in C or C++. It is also usable as an extension language for applications that need a programmable interface. Finally, Python is portable: it runs on many Unix variants including Linux and macOS, and on Windows.`,
    },
    
];

export default sample